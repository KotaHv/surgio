import { URLSearchParams } from 'url';
import { VmessNodeConfig } from '../types';

// https://github.com/v2ray/v2ray-core/issues/1569
export const formatVmessUri = (
  nodeConfig: VmessNodeConfig,
  options?: { readonly isMellow: boolean },
): string => {
  const uri: string[] = [
    nodeConfig.uuid,
    '@',
    `${nodeConfig.hostname}:${nodeConfig.port}`,
    nodeConfig.path || '/',
  ];
  const queries: Record<string, string> = {
    network: nodeConfig.network,
    tls: nodeConfig.tls ? 'true' : 'false',
  };

  if (nodeConfig.skipCertVerify) {
    queries['tls.allowInsecure'] = 'true';
  }

  if (nodeConfig.network === 'ws') {
    if (typeof nodeConfig.wsHeaders !== 'undefined') {
      Object.keys(nodeConfig.wsHeaders).forEach((key) => {
        if (!/host/i.test(key)) {
          queries[`ws.headers.${key}`] = nodeConfig.wsHeaders![key];
        }
      });
    }
    if (nodeConfig.host) {
      if (options?.isMellow) {
        queries[`ws.host`] = nodeConfig.host;
      } else {
        queries[`ws.headers.host`] = nodeConfig.host;
      }
    }
  }

  const queryObject = new URLSearchParams(queries);

  return `vmess://${uri.join('')}?${queryObject.toString()}`;
};
