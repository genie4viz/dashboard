import { EntityShortNames } from '@app/types';

export class Normalize {
  public static workspaceId(raw: string) {
    return `${EntityShortNames.WORKSPACE}${raw}`;
  }

  public static coreId(raw: string) {
    return `${EntityShortNames.CORE}${raw}`;
  }

  public static tableId(raw: string) {
    return `${EntityShortNames.TABLE}${raw}`;
  }

  public static viewId(raw: string) {
    return `${EntityShortNames.VIEW}${raw}`;
  }
}
