const enum accidentals{
    nature,
    sharp,
    dbsharp,
    flat,
    dbflat,
}

class printFuncs{
    static printOnBoard(selected:Array<[number,number]>) {
        //Here to put something
    }
}


class defMusicTranstools {
    static pitchNumSet: Map<number,string> = new Map([
        [0,'C'],[2,'D'],[4,'E'],[5,'F'],[7,'G'],[9,'A'],[11,'B'],
    ]);
    static NumpitchSet: Map<string,number> = new Map([
        ['C',0],['D',2],['E',4],['F',5],['G',7],['A',9],['B',11],['#',1],['b',-1]
    ]);

    static numToCh(rank: number): Array<string>{
        let ans: Array<string> = [];
        let res: string = '';
        if(res = defMusicTranstools.pitchNumSet.get(rank-1))
            ans.push(res+'#');
        if(res = defMusicTranstools.pitchNumSet.get(rank))
            ans.push(res);
        if(res = defMusicTranstools.pitchNumSet.get(rank+1))
            ans.push(res+'b');
        return ans;
    }//Don't recognize double sharp/flat

    static chToNum(pitchName: string): number{
        return (defMusicTranstools.NumpitchSet.get(pitchName[0])
                    +defMusicTranstools.NumpitchSet.get(pitchName[1]))%12;
    }
    //Basic func. Don't recognize the exact group of pitches.
}

abstract class stringInst{
    strCount: number;
    boardLen: number;
    board: Array<Array<number>>;
    openStrPitch: Array<number>;

    constructor(count:number, len:number, iniPitch: Array<number>){
        this.boardLen = len;
        this.strCount = count;
        this.openStrPitch = iniPitch.reverse();
    }

    genBoard(this: stringInst) {
        let nowStr: number = this.strCount;
        while(nowStr > 0){
            let nowPos: number = 0;
            let pitchId = this.openStrPitch[nowStr];
            while(nowPos <= this.boardLen){
                this.board[nowStr][nowPos] = pitchId %= 12;
                pitchId++;
            }
            nowStr--;
        }
    }
}

class guitar extends stringInst{
    constructor(){
        super(6,24,[2,5,1,4,6,2]);
    }
}

class bass extends stringInst{
    constructor(){
        super(4,24,[2,5,1,4]);
    }
}

class bass5Strs extends stringInst{
    constructor(){
        super(5,24,[0,4,1,5,2]);
    }
}

class Ukulele extends stringInst{
    constructor(type: string){
        switch(type){
            case 'S': super(4,14,[4,0,2,5]);
            case 'C': super(4,18,[4,0,2,5]);
            case 'T': super(4,20,[4,0,2,5]);
        }
    }
}

class others extends stringInst{
    constructor(count: number, len:number, openPitch_S:string){
        let openPitch: Array<number> = [];
        openPitch_S.split(' ',count).forEach(Notes => {
            openPitch.push(defMusicTranstools.chToNum(Notes));
        });
        super(count,len,openPitch);
    }
}

class scaleSelect{
    scaleNotes: Array<number>;
    scaleNoteNames: Array<string>;
    selectedNotes: Array<[number,number]>;

    constructor(inputStr: string){
        this.scaleNoteNames = inputStr.split('');
        this.scaleNoteNames.forEach(Notes => {
            this.scaleNotes.push(defMusicTranstools.chToNum(Notes));
            //Input [C D E F G A B]
        })
    }

    boardFind(board: stringInst): Array<[number,number]>{
        //return an array of [1(str),2[pos]]
        board.board.forEach(str_L => {
            str_L.forEach(noteAva =>{
                if(this.scaleNotes.includes(noteAva))
                    this.selectedNotes.push[board.board.indexOf(str_L),str_L.indexOf(noteAva)];
            })
        });
        return this.selectedNotes;
    }    
}

class harmonySelect extends scaleSelect{
    constructor(inputStr: string){
        super(inputStr);
    }

    findHarmStyles(basePos: number): Array<Array<[number,number]>>{
        let ans:Array<Array<[number,number]>> = [];
        
        return ans;
    }    
}

