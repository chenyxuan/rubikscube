export default class LBLSolver {
    cubeState: { [key: string]: string } = {};

    nextColor: { [key: string]: string } = {};
    nextFace: { [key: string]: string } = { l: "f", f: "r", r: "b", b: "l" };
    prevFace: { [key: string]: string } = { l: "b", b: "r", r: "f", f: "l" };

    /*
    
        0: "First layer edges",
        1: "First layer corners",
        2: "Second layer",
        3: "Top cross",
        4: "Third layer corners (pos)",
        5: "Third layer corners (ori)",
        6: "Third layer edges"

    */

    getCubeState(state: string[]) {
        this.cubeState = {
            b: state[49],
            bl: state[50].concat(state[39]),
            d: state[31],
            db: state[34].concat(state[52]),
            dbl: state[33].concat(state[53]).concat(state[42]),
            df: state[28].concat(state[25]),
            dfr: state[29].concat(state[26]).concat(state[15]),
            dl: state[30].concat(state[43]),
            dlf: state[27].concat(state[44]).concat(state[24]),
            dr: state[32].concat(state[16]),
            drb: state[35].concat(state[17]).concat(state[51]),
            f: state[22],
            fr: state[23].concat(state[12]),
            l: state[40],
            lf: state[41].concat(state[21]),
            r: state[13],
            rb: state[14].concat(state[48]),
            u: state[4],
            ub: state[1].concat(state[46]),
            ubl: state[0].concat(state[47]).concat(state[36]),
            uf: state[7].concat(state[19]),
            ufr: state[8].concat(state[20]).concat(state[9]),
            ul: state[3].concat(state[37]),
            ulf: state[6].concat(state[38]).concat(state[18]),
            ur: state[5].concat(state[10]),
            urb: state[2].concat(state[11]).concat(state[45]),
        }

        const color_l = this.cubeState["l"];
        const color_r = this.cubeState["r"];
        const color_f = this.cubeState["f"];
        const color_b = this.cubeState["b"];
        this.nextColor[color_l] = color_f;
        this.nextColor[color_f] = color_r;
        this.nextColor[color_r] = color_b;
        this.nextColor[color_b] = color_l;

        /*
        console.log(this.cubeState);
        console.log(this.nextColor);
        */
    }


    Twist_B(): void {

        let tmp = this.cubeState.ub;
        this.cubeState.ub = this.cubeState.rb;
        this.cubeState.rb = this.cubeState.db;
        this.cubeState.db = this.cubeState.bl[1] + this.cubeState.bl[0];
        this.cubeState.bl = tmp[1] + tmp[0];

        tmp = this.cubeState.ubl;
        this.cubeState.ubl = this.cubeState.urb[1] + this.cubeState.urb[2] + this.cubeState.urb[0];
        this.cubeState.urb = this.cubeState.drb[1] + this.cubeState.drb[0] + this.cubeState.drb[2];
        this.cubeState.drb = this.cubeState.dbl[2] + this.cubeState.dbl[0] + this.cubeState.dbl[1];
        this.cubeState.dbl = tmp[2] + tmp[1] + tmp[0];
    }

    Twist_R(): void {

        let tmp = this.cubeState.ur;
        this.cubeState.ur = this.cubeState.fr;
        this.cubeState.fr = this.cubeState.dr;
        this.cubeState.dr = this.cubeState.rb[1] + this.cubeState.rb[0];
        this.cubeState.rb = tmp[1] + tmp[0];

        tmp = this.cubeState.urb;
        this.cubeState.urb = this.cubeState.ufr[1] + this.cubeState.ufr[2] + this.cubeState.ufr[0];
        this.cubeState.ufr = this.cubeState.dfr[1] + this.cubeState.dfr[0] + this.cubeState.dfr[2];
        this.cubeState.dfr = this.cubeState.drb[2] + this.cubeState.drb[0] + this.cubeState.drb[1];
        this.cubeState.drb = tmp[2] + tmp[1] + tmp[0];
    };

    Twist_F(): void {

        let tmp = this.cubeState.uf;
        this.cubeState.uf = this.cubeState.lf;
        this.cubeState.lf = this.cubeState.df;
        this.cubeState.df = this.cubeState.fr[1] + this.cubeState.fr[0];
        this.cubeState.fr = tmp[1] + tmp[0];


        tmp = this.cubeState.ufr;
        this.cubeState.ufr = this.cubeState.ulf[1] + this.cubeState.ulf[2] + this.cubeState.ulf[0];
        this.cubeState.ulf = this.cubeState.dlf[1] + this.cubeState.dlf[0] + this.cubeState.dlf[2];
        this.cubeState.dlf = this.cubeState.dfr[2] + this.cubeState.dfr[0] + this.cubeState.dfr[1];
        this.cubeState.dfr = tmp[2] + tmp[1] + tmp[0];
    }

    Twist_L(): void {

        let tmp = this.cubeState.ul;
        this.cubeState.ul = this.cubeState.bl;
        this.cubeState.bl = this.cubeState.dl;
        this.cubeState.dl = this.cubeState.lf[1] + this.cubeState.lf[0];
        this.cubeState.lf = tmp[1] + tmp[0];


        tmp = this.cubeState.ulf;
        this.cubeState.ulf = this.cubeState.ubl[1] + this.cubeState.ubl[2] + this.cubeState.ubl[0];
        this.cubeState.ubl = this.cubeState.dbl[1] + this.cubeState.dbl[0] + this.cubeState.dbl[2];
        this.cubeState.dbl = this.cubeState.dlf[2] + this.cubeState.dlf[0] + this.cubeState.dlf[1];
        this.cubeState.dlf = tmp[2] + tmp[1] + tmp[0];
    }

    Twist_U(): void {

        let tmp = this.cubeState.ul;
        this.cubeState.ul = this.cubeState.uf;
        this.cubeState.uf = this.cubeState.ur;
        this.cubeState.ur = this.cubeState.ub;
        this.cubeState.ub = tmp;


        tmp = this.cubeState.ulf;
        this.cubeState.ulf = this.cubeState.ufr;
        this.cubeState.ufr = this.cubeState.urb;
        this.cubeState.urb = this.cubeState.ubl;
        this.cubeState.ubl = tmp;
    }

    Twist_D(): void {

        let tmp = this.cubeState.dl;
        this.cubeState.dl = this.cubeState.db;
        this.cubeState.db = this.cubeState.dr;
        this.cubeState.dr = this.cubeState.df;
        this.cubeState.df = tmp;


        tmp = this.cubeState.dlf;
        this.cubeState.dlf = this.cubeState.dbl;
        this.cubeState.dbl = this.cubeState.drb;
        this.cubeState.drb = this.cubeState.dfr;
        this.cubeState.dfr = tmp;
    }

    Twist_Y(): void {

        this.Twist_U();

        let tmp = this.cubeState.lf;
        this.cubeState.lf = this.cubeState.fr;
        this.cubeState.fr = this.cubeState.rb;
        this.cubeState.rb = this.cubeState.bl;
        this.cubeState.bl = tmp;

        tmp = this.cubeState.f;
        this.cubeState.f = this.cubeState.r;
        this.cubeState.r = this.cubeState.b;
        this.cubeState.b = this.cubeState.l;
        this.cubeState.l = tmp;


        this.Twist_D(), this.Twist_D(), this.Twist_D();
    }


    changeState(order_list: string): void {
        for (const order of order_list) {
            switch (order) {
                case "D":
                    this.Twist_D();
                    break;
                case "d":
                    this.Twist_D(); this.Twist_D(); this.Twist_D();
                    break;
                case "U":
                    this.Twist_U();
                    break;
                case "u":
                    this.Twist_U(); this.Twist_U(); this.Twist_U();
                    break;
                case "L":
                    this.Twist_L();
                    break;
                case "l":
                    this.Twist_L(); this.Twist_L(); this.Twist_L();
                    break;
                case "F":
                    this.Twist_F();
                    break;
                case "f":
                    this.Twist_F(); this.Twist_F(); this.Twist_F();
                    break;
                case "R":
                    this.Twist_R();
                    break;
                case "r":
                    this.Twist_R(); this.Twist_R(); this.Twist_R();
                    break;
                case "B":
                    this.Twist_B();
                    break;
                case "b":
                    this.Twist_B(); this.Twist_B(); this.Twist_B();
                    break;
                case "Y":
                    this.Twist_Y();
                    break;
                case "y":
                    this.Twist_Y(); this.Twist_Y(); this.Twist_Y();
                    break;
            }
        }
    }


    getBlockPos(block: string): { [key: string]: string } {
        const reg = new RegExp("^[" + block + "]{" + block.length + "}$");
        // console.log(reg)
        const result: { [key: string]: string } = {};
        for (let k in this.cubeState) {
            if (this.cubeState[k].match(reg)) {
                result["k"] = k;
                result["v"] = this.cubeState[k];
                return result;
            }
        }
        return result;
    }


    FIRST_LAYER_EDGES_SINGLE(block_pos: string, block_color: string): string {
        let exp = "", exp_log = "";
        let s: { [key: string]: string };
        for (let i = 0; i < 7; i++) {
            s = this.getBlockPos(block_color);
            // console.log(s)
            if (s.k.indexOf("d") != -1) {
                if (s.v[0] == block_color[0]) {
                    if (s.k == block_pos) return exp_log;
                    else exp = s.k[1].toUpperCase() + s.k[1].toUpperCase();
                }
                else exp = s.k[1].toUpperCase();
            }
            else if (s.k.indexOf("u") != -1) {
                if (s.k[1] == block_pos[1]) {
                    if (s.v[0] == block_color[0]) exp = s.k[1].toUpperCase() + s.k[1].toUpperCase();
                    else if (this.cubeState[block_pos[0] + this.nextFace[s.k[1]]] !=
                        this.cubeState[block_pos[0]] + this.cubeState[this.nextFace[s.k[1]]])
                        exp = "u" + this.nextFace[s.k[1]] + s.k[1].toUpperCase();
                    else exp = "u" + this.nextFace[s.k[1]] + s.k[1].toUpperCase() + this.nextFace[s.k[1]].toUpperCase();
                }
                else exp = "U";
            }
            else {
                if (s.v[0] == block_color[0]) {
                    if (s.k[1] == block_pos[1]) exp = s.k[1];
                    else if (this.cubeState[block_pos[0] + s.k[1]] != this.cubeState[block_pos[0]] + this.cubeState[s.k[1]]) exp = s.k[1].toUpperCase();
                    else exp = s.k[1].toUpperCase() + "U" + s.k[1];
                }
                else {
                    if (s.k[0] == block_pos[1]) exp = s.k[0].toUpperCase();
                    else if (this.cubeState[block_pos[0] + s.k[0]] != this.cubeState[block_pos[0]] + this.cubeState[s.k[0]]) exp = s.k[0];
                    else exp = s.k[0] + "U" + s.k[0].toUpperCase();
                }
            }
            exp_log += exp;
            this.changeState(exp);
        }
        console.log("First Layer Cross Single Error: ", exp_log);
        return "First Layer Cross Single Error: " + exp_log;
    }

    FIRST_LAYER_CORNERS_SINGLE(block_pos: string, block_color: string): string {
        let exp = "", exp_log = "", s;
        for (let i = 0; i < 10; i++) {
            s = this.getBlockPos(block_color);
            if (s.k.indexOf("d") != -1) {
                if (s.v[0] == this.cubeState["d"]) {
                    if (s.k == block_pos) return exp_log;
                    else exp = s.k[1] + "U" + s.k[1].toUpperCase();
                }
                else if (s.v[1] == this.cubeState["d"]) exp = s.k[1] + "u" + s.k[1].toUpperCase();
                else exp = s.k[2].toUpperCase() + "U" + s.k[2];
            }
            else {

                if (s.k == "u" + block_pos[1] + block_pos[2]) {
                    if (s.v[0] == this.cubeState["d"]) exp = s.k[2].toUpperCase() + "u" + s.k[2];
                    else if (s.v[1] == this.cubeState["d"]) exp = s.k[1] + "u" + s.k[1].toUpperCase();
                    else exp = s.k[2].toUpperCase() + "U" + s.k[2];
                }
                else exp = "U";
            }
            exp_log += exp;
            this.changeState(exp);
        }
        console.log("First Layer Corners Single Error: ", exp_log);
        return "First Layer Corners Single Error: " + exp_log;
    };

    SECOND_LAYER_SINGLE(): string {
        const block_color = this.cubeState["f"] + this.cubeState["r"]
        let exp = "", exp_log = "";
        for (let i = 0; i < 6; i++) {
            const s = this.getBlockPos(block_color);
            if (s.k.indexOf("u") != -1) {
                if (s.k[1] == 'r' && s.v[1] == this.cubeState["r"]) {
                    exp = "ufUFURur";
                } else if (s.k[1] == 'f' && s.v[1] == this.cubeState["f"]) {
                    exp = "URurufUF";
                } else {
                    exp = "U";
                }
            }
            else {
                if (s.v[0] == this.cubeState[s.k[0]] && s.v[1] == this.cubeState[s.k[1]]) return exp_log;
                else exp = "u" + s.k[0] + "U" + s.k[0].toUpperCase() + "U" + s.k[1].toUpperCase() + "u" + s.k[1];
            }
            exp_log += exp;
            this.changeState(exp);
        }
        console.log("Second Layer Single Error: ", exp_log);
        return "Second Layer Single Error: " + exp_log;
    }

    // --------------- COMPLETE THE FIRST LAYER EDGES ---------------
    FIRST_LAYER_EDGES(delayed: string): string {
        console.log("------------ COMPLETE THE FIRST LAYER EDGES ------------");
        let order = "";
        if (delayed == "z2") {
            for (let i = 0; i < 4; i++) {
                order += this.FIRST_LAYER_EDGES_SINGLE("df", this.cubeState["d"] + this.cubeState["f"]);
                order += "y";
                this.changeState("y");
            }
        } else if (delayed == "x2") {
            for (let i = 0; i < 4; i++) {
                order += this.FIRST_LAYER_EDGES_SINGLE("db", this.cubeState["d"] + this.cubeState["b"]);
                order += "y";
                this.changeState("y");
            }
        }

        /*
        order += this.FIRST_LAYER_EDGES_SINGLE("df", this.cubeState["d"] + this.cubeState["f"]);
        order += this.FIRST_LAYER_EDGES_SINGLE("dr", this.cubeState["d"] + this.cubeState["r"]);
        order += this.FIRST_LAYER_EDGES_SINGLE("db", this.cubeState["d"] + this.cubeState["b"]);
        order += this.FIRST_LAYER_EDGES_SINGLE("dl", this.cubeState["d"] + this.cubeState["l"]);
        */
        return this.compress(order);
        //Execute(order, "First layer edges");
    };

    // --------------  COMPLETE THE FIRST LAYER CORNERS --------------
    FIRST_LAYER_CORNERS(delayed: string): string {
        console.log("------------ COMPLETE THE FIRST LAYER CORNERS ------------");
        let order = "";
        if (delayed == "z2") {
            for (let i = 0; i < 4; i++) {
                order += this.FIRST_LAYER_CORNERS_SINGLE("dlf", this.cubeState["d"] + this.cubeState["l"] + this.cubeState["f"]);
                order += "y";
                this.changeState("y");
            }
        } else if (delayed == "x2") {
            for (let i = 0; i < 4; i++) {
                order += this.FIRST_LAYER_CORNERS_SINGLE("drb", this.cubeState["d"] + this.cubeState["r"] + this.cubeState["b"]);
                order += "y";
                this.changeState("y");
            }
        }

        /*
        order += this.FIRST_LAYER_CORNERS_SINGLE("dlf", this.cubeState["d"] + this.cubeState["l"] + this.cubeState["f"]);
        order += this.FIRST_LAYER_CORNERS_SINGLE("dfr", this.cubeState["d"] + this.cubeState["f"] + this.cubeState["r"]);
        order += this.FIRST_LAYER_CORNERS_SINGLE("drb", this.cubeState["d"] + this.cubeState["r"] + this.cubeState["b"]);
        order += this.FIRST_LAYER_CORNERS_SINGLE("dbl", this.cubeState["d"] + this.cubeState["b"] + this.cubeState["l"]);
        */
        return this.compress(order);
        //Execute(order, "First layer corners");
    }

    // ---------------  COMPLETE THE SECOND LAYER ---------------
    SECOND_LAYER(): string {
        console.log("------------ COMPLETE THE SECOND LAYER ------------");
        let order = "";
        for (let i = 0; i < 4; i++) {
            order += this.SECOND_LAYER_SINGLE();
            order += "Y";
            this.changeState("Y");
        }
        /*        
        order += this.SECOND_LAYER_SINGLE("lf", this.cubeState["l"] + this.cubeState["f"]);
        order += this.SECOND_LAYER_SINGLE("rb", this.cubeState["r"] + this.cubeState["b"]);
        order += this.SECOND_LAYER_SINGLE("bl", this.cubeState["b"] + this.cubeState["l"]);
        */
        return this.compress(order);
    };

    // --------------- COMPLETE THE TOP CROSS ---------------
    TOP_CROSS(): string {
        console.log("------------ COMPLETE THE TOP CROSS ------------");
        let exp = "", exp_log = "";
        let uc = this.cubeState["u"];

        for (let i = 0; i < 4; i++) {
            if (this.cubeState.ul[0] == uc && this.cubeState.ur[0] == uc
                && this.cubeState.uf[0] == uc && this.cubeState.ub[0] == uc)
                return this.compress(exp_log);
            if (this.cubeState.ub[0] == uc && this.cubeState.ul[0] == uc) exp = "rufUFR";
            else if (this.cubeState.uf[0] == uc && this.cubeState.ub[0] == uc) exp = "rfuFUR";
            else if (this.cubeState.ul[0] == uc && this.cubeState.ur[0] == uc) exp = "Y";
            else if (this.cubeState.uf[0] == uc && this.cubeState.ur[0] == uc) exp = "YY";
            else if (this.cubeState.ur[0] == uc && this.cubeState.ub[0] == uc) exp = "Y";
            else if (this.cubeState.ul[0] == uc && this.cubeState.uf[0] == uc) exp = "y";
            else exp = "rufUFRUrfuFUR";
            exp_log += exp;
            this.changeState(exp);
        }
        console.log("Top Cross Error: ", exp_log);
        return "Top Cross Error: " + exp_log;
    };

    // ----- COMPLETE THE THIRD LAYER CORNERS (POSITION) -----
    THIRD_LAYER_CORNERS_POS(): string {
        console.log("------------ COMPLETE THE THIRD LAYER CORNERS (POSITION) ------------");
        const step = "rLUluRULul", blocks = ["ulf", "ufr", "urb", "ubl"], uc = this.cubeState["u"];
        let exp_log = "";

        for (let i = 0; i < 4; i++) {
            let last = i;
            let times = 0;
            for (let j = i + 1; j < i + 4; j++) {
                const next = j % 4;
                let lastc = this.cubeState[blocks[last]].replace(uc, "");
                let nextc = this.cubeState[blocks[next]].replace(uc, "");

                if (this.nextColor[lastc[0]] == lastc[1]) {

                    if (nextc.indexOf(lastc[1]) != -1
                        && nextc.indexOf(this.nextColor[lastc[1]]) != -1) times += 1;
                    else break;
                }
                else {
                    if (nextc.indexOf(lastc[0]) != -1
                        && nextc.indexOf(this.nextColor[lastc[0]]) != -1) times += 1;
                    else break;
                }

                last = next;
            }

            if (times == 1) {
                last = (last - 1 + 4) % 4;
                if (last == 0) exp_log = "u" + step, this.changeState(exp_log);
                else if (last == 1) exp_log = step, this.changeState(exp_log);
                else if (last == 2) exp_log = "U" + step, this.changeState(exp_log);
                else if (last == 3) exp_log = "UU" + step, this.changeState(exp_log);
                return this.compress(exp_log);
            }

            else if (times > 1) return this.compress(exp_log);
        }

        exp_log = step + "U" + step;
        this.changeState(exp_log);
        return this.compress(exp_log);
    }

    // ----- COMPLETE THE THIRD LAYER CORNERS (ORIENT) -----
    THIRD_LAYER_CORNERS_ORI(): string {
        console.log("------------ COMPLETE THE THIRD LAYER CORNERS (ORIENT) ------------");
        const step1 = "ruRuruuRuu", step2 = "FUfUFUUfUU";
        const blocks = ["ulf", "ufr", "urb", "ubl"], uc = this.cubeState["u"];
        let exp_log = "", s = "";

        for (const block of blocks) s += this.cubeState[block].indexOf(uc);

        if (s.match(/2220|0222|2022|2202/)) {
            if (s == "0222") exp_log += "U";
            else if (s == "2022") exp_log += "UU";
            else if (s == "2202") exp_log += "u";
            exp_log += step1;
        }
        else if (s.match(/1110|0111|1011|1101/)) {
            if (s == "0111") exp_log += "U";
            else if (s == "1011") exp_log += "UU";
            else if (s == "1101") exp_log += "u";
            exp_log += step2;
        }
        else if (s.match(/2001|1200|0120|0012/)) {
            if (s == "1200") exp_log += "U";
            else if (s == "0120") exp_log += "UU";
            else if (s == "0012") exp_log += "u";
            exp_log += step1 + "U" + step2;
        }
        else if (s.match(/1002|2100|0210|0021/)) {
            if (s == "2100") exp_log += "U";
            else if (s == "0210") exp_log += "UU";
            else if (s == "0021") exp_log += "u";
            exp_log += step2 + "U" + step1;
        }
        else if (s.match(/2121|1212/)) {
            if (s == "1212") exp_log += "U";
            exp_log += step2 + "UU" + step2;
        }
        else if (s.match(/2112|2211|1221|1122/)) {
            if (s == "2211") exp_log += "U";
            else if (s == "1221") exp_log += "UU";
            else if (s == "1122") exp_log += "u";
            exp_log += step1 + "U" + step1;
        }
        else if (s.match(/0201|1020/)) {
            if (s == "1020") exp_log += "U";
            exp_log += step1 + "UU" + step2;
        }
        else if (s.match(/0102|2010/)) {
            if (s == "2010") exp_log += "U";
            exp_log += step2 + "UU" + step1;
        }

        this.changeState(exp_log);
        // console.log(exp_log)
        return this.compress(exp_log);
    }

    // --------------- COMPLETE THE THIRD LAYER EDGES ---------------
    THIRD_LAYER_EDGES(): string {
        console.log("------------ COMPLETE THE THIRD LAYER EDGES ------------")
        const step1 = "ruRuruuRuu", step2 = "FUfUFUUfUU";
        let exp_log = "";


        while (this.cubeState.ulf[2] != this.cubeState.f) {
            this.changeState("U");
            exp_log += "U";
        }

        for (let i = 0; i < 3; i++) {
            let exp = "";
            const s = this.cubeState.uf[1] + this.cubeState.ur[1] + this.cubeState.ub[1] + this.cubeState.ul[1];
            const c = this.cubeState.f + this.cubeState.r + this.cubeState.b + this.cubeState.l;

            let times = 0, pos = -1;
            for (let j = 0; j < 4; j++) {
                if (s[j] == c[j]) times++, pos = j;
            }

            // console.log(s, c)
            // console.log(times, pos)


            if (times > 1) return this.compress(exp_log)
            else if (times == 1) {
                if (pos == 1) exp += "Y";
                else if (pos == 2) exp += "YY";
                else if (pos == 3) exp += "y";

                if (s[(pos + 1) % 4] == this.nextColor[this.nextColor[s[pos]]])
                    exp += step1 + step2;
                else exp += "y" + step2 + step1;
            }
            else exp += step1 + step2;

            exp_log += exp;
            this.changeState(exp);
        }

        console.log("Third Layer Edges Error: ", exp_log);
        return "Third Layer Edges Error: " + exp_log;
    }

    solveCube(delayed: string): string[] {
        let steps = [];
        steps.push(this.FIRST_LAYER_EDGES(delayed));
        steps.push(this.FIRST_LAYER_CORNERS(delayed));
        steps.push(this.SECOND_LAYER());
        steps.push(this.TOP_CROSS());
        steps.push(this.THIRD_LAYER_CORNERS_POS());
        steps.push(this.THIRD_LAYER_CORNERS_ORI());
        steps.push(this.THIRD_LAYER_EDGES());
        return steps;
    };

    compress(order: string) {
        for (let i = 0; i < 10; i++) {
            order = order.replace(/uU|Uu|dD|Dd|lL|Ll|fF|Ff|rR|Rr|bB|Bb|yY|Yy|uuuu|dddd|llll|ffff|rrrr|bbbb|yyyy|UUUU|DDDD|LLLL|FFFF|RRRR|BBBB|YYYY/g, "");
            order = order.replace(/uuu/g, "U");
            order = order.replace(/ddd/g, "D");
            order = order.replace(/lll/g, "L");
            order = order.replace(/fff/g, "F");
            order = order.replace(/rrr/g, "R");
            order = order.replace(/bbb/g, "B");
            order = order.replace(/yyy/g, "Y");

            order = order.replace(/UUU/g, "u");
            order = order.replace(/DDD/g, "d");
            order = order.replace(/LLL/g, "l");
            order = order.replace(/FFF/g, "f");
            order = order.replace(/RRR/g, "r");
            order = order.replace(/BBB/g, "b");
            order = order.replace(/YYY/g, "y");
        }
        return order;
    }

    solve(state: string[], delayed: string): string[] {
        this.getCubeState(state);
        return this.solveCube(delayed);
    }
}
