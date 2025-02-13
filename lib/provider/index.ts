import { SupportProviderEnum } from '../types';
import BlackSSLProvider from './BlackSSLProvider';
import ClashProvider from './ClashProvider';
import CustomProvider from './CustomProvider';
import ShadowsocksJsonSubscribeProvider from './ShadowsocksJsonSubscribeProvider';
import ShadowsocksrSubscribeProvider from './ShadowsocksrSubscribeProvider';
import ShadowsocksSubscribeProvider from './ShadowsocksSubscribeProvider';
import SsdProvider from './SsdProvider';
import TrojanProvider from './TrojanProvider';
import { PossibleProviderType } from './types';
import V2rayNSubscribeProvider from './V2rayNSubscribeProvider';

export { PossibleProviderType };

export async function getProvider(
  name: string,
  config: any,
): Promise<PossibleProviderType> {
  // 函数形式，需要先获取到返回值
  if (typeof config === 'function') {
    config = await config();
  }

  switch (config.type) {
    case SupportProviderEnum.BlackSSL:
      return new BlackSSLProvider(name, config);

    case SupportProviderEnum.ShadowsocksJsonSubscribe:
      return new ShadowsocksJsonSubscribeProvider(name, config);

    case SupportProviderEnum.ShadowsocksSubscribe:
      return new ShadowsocksSubscribeProvider(name, config);

    case SupportProviderEnum.ShadowsocksrSubscribe:
      return new ShadowsocksrSubscribeProvider(name, config);

    case SupportProviderEnum.Custom: {
      return new CustomProvider(name, config);
    }

    case SupportProviderEnum.V2rayNSubscribe:
      return new V2rayNSubscribeProvider(name, config);

    case SupportProviderEnum.Clash:
      return new ClashProvider(name, config);

    case SupportProviderEnum.Ssd:
      return new SsdProvider(name, config);

    case SupportProviderEnum.Trojan:
      return new TrojanProvider(name, config);

    default:
      throw new Error(`Unsupported provider type: ${config.type}`);
  }
}
