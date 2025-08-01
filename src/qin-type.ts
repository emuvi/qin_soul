export type QinWaiter = (result: any) => void;

export class QinWaiters {
   private _waiters: QinWaiter[];

   public constructor(initial?: QinWaiter[]) {
      this._waiters = initial ? initial : [];
   }

   public put(waiter: QinWaiter): QinWaiters {
      this._waiters.push(waiter);
      return this;
   }

   public del(waiter: QinWaiter): QinWaiters {
      const index = this._waiters.indexOf(waiter);
      if (index !== -1) {
         this._waiters.splice(index, 1);
      }
      return this;
   }

   public has(waiter: QinWaiter): boolean {
      return this._waiters.indexOf(waiter) > 0;
   }

   public clean(): QinWaiters {
      this._waiters.length = 0;
      return this;
   }

   public send(result: any) {
      for (const waiter of this._waiters) {
         waiter(result);
      }
   }
}

export type TryAuth = {
    name: string;
    pass: string;
};

export type Logged = {
    token: string;
    lang: string;
};

export type PathList = {
    path: string;
    list: Array<PathKindName>;
}

export type PathKindName = {
    kind: PathKind;
    name: string;
}

export enum PathKind {
    FOLDER = "FOLDER",
    FILE = "FILE"
}

export type Where = {
    path: string;
}

export type Transfer = {
    origin: string;
    destiny: string;
}

export type PathRead = {
    path: string;
    base64: boolean;
    rangeStart: number;
    rangeLength: number;
}

export type PathWrite = {
    path: string;
    base64: boolean;
    data: string;
    rangeStart: number;
}

export type Execute = {
    name: string;
    args?: string[];
    input?: string[];
    joinErrs?: boolean;
    logLevel?: LogLevel;
};

export enum LogLevel {
    LEVEL_ERROR = 0,
    LEVEL_WARN = 1,
    LEVEL_INFO = 2,
    LEVEL_DEBUG = 3,
    LEVEL_TRACE = 4,
}

export type IssuedToken = string;

export type IssuedQuestion = {
    token: IssuedToken;
    askCreatedAt?: boolean;
    askOutLines?: boolean;
    askOutLinesFrom?: number;
    askOutLinesUntil?: number;
    askOutLinesSize?: boolean;
    askErrLines?: boolean;
    askErrLinesFrom?: number;
    askErrLinesUntil?: number;
    askErrLinesSize?: boolean;
    askResultCode?: boolean;
    askIsDone?: boolean;
    askHasOut?: boolean;
    askHasErr?: boolean;
    askFinishedAt?: boolean;
};

export type IssuedAnswer = {
    createdAt?: number;
    outLines?: string;
    outLinesFrom?: string[];
    outLinesSize?: number;
    errLines?: string;
    errLinesFrom?: string[];
    errLinesSize?: number;
    resultCode?: number;
    isDone?: boolean;
    hasOut?: boolean;
    hasErr?: boolean;
    finishedAt?: number;
};

export type AskConstantly = {
    stop?: boolean;
    onReceive?: (received: IssuedAnswer) => void;
    onError?: (err: any) => void;
};

export type AskStream = {
    token: string;
    chunks: number;
    onReceive?: (line: string) => void;
    onFinish?: (size: number) => void;
    onError?: (err: any) => void;
};

export enum StreamKind {
    OUT = "OUT",
    ERR = "ERR",
}

export type AllowReg = {
    registry: Registry;
    all: Boolean;
    insert: Boolean;
    select: Boolean;
    update: Boolean;
    delete: Boolean;
    strain: Strain;
}

export type Registry = {
   base: string;
   tableHead: TableHead;
}

export type Strain = {
   restrict: string;
   modify: string;
   include: string;
}

export type ToInsert = {
   base: string;
   insert: Insert;
}

export type Insert = {
   tableHead: TableHead;
   valuedList: Array<Valued>;
   toGetID: ToGetID;
}

export type ToSelect = {
   base: string;
   select: Select;
}

export type Select = {
   tableHead: TableHead;
   fieldList: Array<Typed>;
   joinList: Array<Join>;
   filterList: Array<Filter>;
   orderList: Array<Order>;
   offset: number;
   limit: number;
}

export type ToUpdate = {
   base: string;
   update: Update;
}

export type Update = {
   tableHead: TableHead;
   valuedList: Array<Valued>;
   filterList: Array<Filter>;
   limit: number;
}

export type ToDelete = {
   base: string;
   delete: Delete;
}

export type Delete = {
   tableHead: TableHead;
   filterList: Array<Filter>;
}

export type TableHead = {
   catalog: string;
   schema: string;
   name: string;
   alias: string;
}

export type ToGetID = {
   name: string;
   filter: Valued;
}

export type Join = {
   tableHead: TableHead;
   alias: String;
   filterList: Array<Filter>;
   ties: JoinTies;
}

export enum JoinTies {
   INNER = "INNER",
   LEFT = "LEFT",
   RIGHT = "RIGHT",
   FULL = "FULL",
   CROSS = "CROSS"
}

export type Filter = {
   seems: FilterSeems;
   likes: FilterLikes;
   valued: Valued;
   linked: Linked;
   ties: FilterTies;
}

export enum FilterSeems {
   IS = "IS",
   NOT = "NOT"
}

export enum FilterLikes {
   EQUALS = "EQUALS",
   BIGGER = "BIGGER",
   LESSER = "LESSER",
   BIGGER_EQUALS = "BIGGER_EQUALS",
   LESSER_EQUALS = "LESSER_EQUALS",
   STARTS_WITH = "STARTS_WITH",
   ENDS_WITH = "ENDS_WITH",
   CONTAINS = "CONTAINS"
}

export enum FilterTies {
   AND = "AND",
   OR = "OR"
}

export type Linked = {
   name: string;
   upon: string;
}

export type Order = {
   name: string;
   desc: boolean;
}

export type Valued = {
   name: string;
   type: Nature;
   data: any;
}

export type Typed = {
   name: string;
   type: Nature;
   alias: string;
}

export enum Nature {
   BIT = "BIT",
   BOOL = "BOOL",
   BYTE = "BYTE",
   TINY = "TINY",
   SMALL = "SMALL",
   INT = "INT",
   LONG = "LONG",
   SERIAL = "SERIAL",
   BIG_SERIAL = "BIG_SERIAL",
   FLOAT = "FLOAT",
   REAL = "REAL",
   DOUBLE = "DOUBLE",
   NUMERIC = "NUMERIC",
   BIG_NUMERIC = "BIG_NUMERIC",
   CHAR = "CHAR",
   CHARS = "CHARS",
   DATE = "DATE",
   TIME = "TIME",
   DATE_TIME = "DATE_TIME",
   TIMESTAMP = "TIMESTAMP",
   BYTES = "BYTES",
   BLOB = "BLOB",
   TEXT = "TEXT"
}

export type Setup = {
    serverName?: string;
    serverLang?: string;
    serverHost?: string;
    serverPort?: number;
    serverFolder?: string;
    servesPub?: boolean;
    servesApp?: boolean;
    servesDir?: boolean;
    servesCmd?: boolean;
    servesBas?: boolean;
    servesReg?: boolean;
    servesGiz?: boolean;

    configMap?: Map<string, string>;
    redirectMap?: Map<string, string>;

    threadsMin?: number;
    threadsMax?: number;
    threadsIdleTimeout?: number;
    cleanInterval?: number;
    tokenValidity?: number;
}
