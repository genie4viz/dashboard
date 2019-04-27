import { ApolloClient } from 'apollo-boost';

interface IGraphqlErrorMessage {
  message: {
    message: string;
    code: string;
  };
}

export interface IGraphqlError {
  graphQLErrors: IGraphqlErrorMessage[];
}

export interface IContext {
  apolloClient: ApolloClient<any>;
}

export interface ICellHtmlDomData {
  target: {
    dataset: {
      columnid?: string;
      columnindex?: number;
      rowid?: string;
      rowindex?: number;
    };
  };
}

/**
 * short names for general entites.
 * Mostly to use together with uuid.
 */
export enum EntityShortNames {
  WORKSPACE = 'wsp',
  COLUMN = 'clm',
  VIEW = 'viw',
  ROW = 'row',
  CELL = 'cll',
  TABLE = 'tbl',
  CORE = 'cre',
}

export interface IFile {
  name: string;
}

export interface IAdaptedAttachment {
  fileId: string;
  fileName: string;
  fileType: string;
  fullThumbUrl: string;
  largeThumbUrl: string;
  smallThumbUrl: string;
  url: string;
}
