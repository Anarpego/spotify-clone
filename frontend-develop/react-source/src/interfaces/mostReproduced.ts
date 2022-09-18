interface MostReproduced {
    status:  boolean;
    reporte: Array<SongDetail[] | DBmsg>;
}

export interface SongDetail {
    name:  string;
    total: number;
}

interface DBmsg {
    fieldCount:   number;
    affectedRows: number;
    insertID:     number;
    serverStatus: number;
    warningCount: number;
    message:      string;
    protocol41:   boolean;
    changedRows:  number;
}
