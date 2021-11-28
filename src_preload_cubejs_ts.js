(self["webpackChunkrubikscube"] = self["webpackChunkrubikscube"] || []).push([["src_preload_cubejs_ts"],{

/***/ "./node_modules/cubejs/index.js":
/*!**************************************!*\
  !*** ./node_modules/cubejs/index.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./lib/cube */ "./node_modules/cubejs/lib/cube.js");
__webpack_require__(/*! ./lib/solve */ "./node_modules/cubejs/lib/solve.js");


/***/ }),

/***/ "./node_modules/cubejs/lib/cube.js":
/*!*****************************************!*\
  !*** ./node_modules/cubejs/lib/cube.js ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
(function() {
  // Centers
  var B, BL, BR, Cube, D, DB, DBL, DF, DFR, DL, DLF, DR, DRB, F, FL, FR, L, R, U, UB, UBR, UF, UFL, UL, ULB, UR, URF, centerColor, centerFacelet, cornerColor, cornerFacelet, edgeColor, edgeFacelet;

  [U, R, F, D, L, B] = [0, 1, 2, 3, 4, 5];

  // Corners
  [URF, UFL, ULB, UBR, DFR, DLF, DBL, DRB] = [0, 1, 2, 3, 4, 5, 6, 7];

  // Edges
  [UR, UF, UL, UB, DR, DF, DL, DB, FR, FL, BL, BR] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  [centerFacelet, cornerFacelet, edgeFacelet] = (function() {
    var _B, _D, _F, _L, _R, _U;
    _U = function(x) {
      return x - 1;
    };
    _R = function(x) {
      return _U(9) + x;
    };
    _F = function(x) {
      return _R(9) + x;
    };
    _D = function(x) {
      return _F(9) + x;
    };
    _L = function(x) {
      return _D(9) + x;
    };
    _B = function(x) {
      return _L(9) + x;
    };
    return [
      // Centers
      [4,
      13,
      22,
      31,
      40,
      49],
      // Corners
      [[_U(9),
      _R(1),
      _F(3)],
      [_U(7),
      _F(1),
      _L(3)],
      [_U(1),
      _L(1),
      _B(3)],
      [_U(3),
      _B(1),
      _R(3)],
      [_D(3),
      _F(9),
      _R(7)],
      [_D(1),
      _L(9),
      _F(7)],
      [_D(7),
      _B(9),
      _L(7)],
      [_D(9),
      _R(9),
      _B(7)]],
      // Edges
      [[_U(6),
      _R(2)],
      [_U(8),
      _F(2)],
      [_U(4),
      _L(2)],
      [_U(2),
      _B(2)],
      [_D(6),
      _R(8)],
      [_D(2),
      _F(8)],
      [_D(4),
      _L(8)],
      [_D(8),
      _B(8)],
      [_F(6),
      _R(4)],
      [_F(4),
      _L(6)],
      [_B(6),
      _L(4)],
      [_B(4),
      _R(6)]]
    ];
  })();

  centerColor = ['U', 'R', 'F', 'D', 'L', 'B'];

  cornerColor = [['U', 'R', 'F'], ['U', 'F', 'L'], ['U', 'L', 'B'], ['U', 'B', 'R'], ['D', 'F', 'R'], ['D', 'L', 'F'], ['D', 'B', 'L'], ['D', 'R', 'B']];

  edgeColor = [['U', 'R'], ['U', 'F'], ['U', 'L'], ['U', 'B'], ['D', 'R'], ['D', 'F'], ['D', 'L'], ['D', 'B'], ['F', 'R'], ['F', 'L'], ['B', 'L'], ['B', 'R']];

  Cube = (function() {
    var faceNames, faceNums, parseAlg;

    class Cube {
      constructor(other) {
        var x;
        if (other != null) {
          this.init(other);
        } else {
          this.identity();
        }
        // For moves to avoid allocating new objects each time
        this.newCenter = (function() {
          var k, results;
          results = [];
          for (x = k = 0; k <= 5; x = ++k) {
            results.push(0);
          }
          return results;
        })();
        this.newCp = (function() {
          var k, results;
          results = [];
          for (x = k = 0; k <= 7; x = ++k) {
            results.push(0);
          }
          return results;
        })();
        this.newEp = (function() {
          var k, results;
          results = [];
          for (x = k = 0; k <= 11; x = ++k) {
            results.push(0);
          }
          return results;
        })();
        this.newCo = (function() {
          var k, results;
          results = [];
          for (x = k = 0; k <= 7; x = ++k) {
            results.push(0);
          }
          return results;
        })();
        this.newEo = (function() {
          var k, results;
          results = [];
          for (x = k = 0; k <= 11; x = ++k) {
            results.push(0);
          }
          return results;
        })();
      }

      init(state) {
        this.center = state.center.slice(0);
        this.co = state.co.slice(0);
        this.ep = state.ep.slice(0);
        this.cp = state.cp.slice(0);
        return this.eo = state.eo.slice(0);
      }

      identity() {
        var x;
        // Initialize to the identity cube
        this.center = [0, 1, 2, 3, 4, 5];
        this.cp = [0, 1, 2, 3, 4, 5, 6, 7];
        this.co = (function() {
          var k, results;
          results = [];
          for (x = k = 0; k <= 7; x = ++k) {
            results.push(0);
          }
          return results;
        })();
        this.ep = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        return this.eo = (function() {
          var k, results;
          results = [];
          for (x = k = 0; k <= 11; x = ++k) {
            results.push(0);
          }
          return results;
        })();
      }

      toJSON() {
        return {
          center: this.center,
          cp: this.cp,
          co: this.co,
          ep: this.ep,
          eo: this.eo
        };
      }

      asString() {
        var corner, edge, i, k, l, m, n, o, ori, p, result;
        result = [];
        for (i = k = 0; k <= 5; i = ++k) {
          result[9 * i + 4] = centerColor[this.center[i]];
        }
        for (i = l = 0; l <= 7; i = ++l) {
          corner = this.cp[i];
          ori = this.co[i];
          for (n = m = 0; m <= 2; n = ++m) {
            result[cornerFacelet[i][(n + ori) % 3]] = cornerColor[corner][n];
          }
        }
        for (i = o = 0; o <= 11; i = ++o) {
          edge = this.ep[i];
          ori = this.eo[i];
          for (n = p = 0; p <= 1; n = ++p) {
            result[edgeFacelet[i][(n + ori) % 2]] = edgeColor[edge][n];
          }
        }
        return result.join('');
      }

      static fromString(str) {
        var col1, col2, cube, i, j, k, l, m, o, ori, p, q, r, ref;
        cube = new Cube;
        for (i = k = 0; k <= 5; i = ++k) {
          for (j = l = 0; l <= 5; j = ++l) {
            if (str[9 * i + 4] === centerColor[j]) {
              cube.center[i] = j;
            }
          }
        }
        for (i = m = 0; m <= 7; i = ++m) {
          for (ori = o = 0; o <= 2; ori = ++o) {
            if ((ref = str[cornerFacelet[i][ori]]) === 'U' || ref === 'D') {
              break;
            }
          }
          col1 = str[cornerFacelet[i][(ori + 1) % 3]];
          col2 = str[cornerFacelet[i][(ori + 2) % 3]];
          for (j = p = 0; p <= 7; j = ++p) {
            if (col1 === cornerColor[j][1] && col2 === cornerColor[j][2]) {
              cube.cp[i] = j;
              cube.co[i] = ori % 3;
            }
          }
        }
        for (i = q = 0; q <= 11; i = ++q) {
          for (j = r = 0; r <= 11; j = ++r) {
            if (str[edgeFacelet[i][0]] === edgeColor[j][0] && str[edgeFacelet[i][1]] === edgeColor[j][1]) {
              cube.ep[i] = j;
              cube.eo[i] = 0;
              break;
            }
            if (str[edgeFacelet[i][0]] === edgeColor[j][1] && str[edgeFacelet[i][1]] === edgeColor[j][0]) {
              cube.ep[i] = j;
              cube.eo[i] = 1;
              break;
            }
          }
        }
        return cube;
      }

      clone() {
        return new Cube(this.toJSON());
      }

      // A class method returning a new random cube
      static random() {
        return new Cube().randomize();
      }

      isSolved() {
        var c, cent, clone, e, k, l, m;
        clone = this.clone();
        clone.move(clone.upright());
        for (cent = k = 0; k <= 5; cent = ++k) {
          if (clone.center[cent] !== cent) {
            return false;
          }
        }
        for (c = l = 0; l <= 7; c = ++l) {
          if (clone.cp[c] !== c) {
            return false;
          }
          if (clone.co[c] !== 0) {
            return false;
          }
        }
        for (e = m = 0; m <= 11; e = ++m) {
          if (clone.ep[e] !== e) {
            return false;
          }
          if (clone.eo[e] !== 0) {
            return false;
          }
        }
        return true;
      }

      // Multiply this Cube with another Cube, restricted to centers.
      centerMultiply(other) {
        var from, k, to;
        for (to = k = 0; k <= 5; to = ++k) {
          from = other.center[to];
          this.newCenter[to] = this.center[from];
        }
        [this.center, this.newCenter] = [this.newCenter, this.center];
        return this;
      }

      // Multiply this Cube with another Cube, restricted to corners.
      cornerMultiply(other) {
        var from, k, to;
        for (to = k = 0; k <= 7; to = ++k) {
          from = other.cp[to];
          this.newCp[to] = this.cp[from];
          this.newCo[to] = (this.co[from] + other.co[to]) % 3;
        }
        [this.cp, this.newCp] = [this.newCp, this.cp];
        [this.co, this.newCo] = [this.newCo, this.co];
        return this;
      }

      // Multiply this Cube with another Cube, restricted to edges
      edgeMultiply(other) {
        var from, k, to;
        for (to = k = 0; k <= 11; to = ++k) {
          from = other.ep[to];
          this.newEp[to] = this.ep[from];
          this.newEo[to] = (this.eo[from] + other.eo[to]) % 2;
        }
        [this.ep, this.newEp] = [this.newEp, this.ep];
        [this.eo, this.newEo] = [this.newEo, this.eo];
        return this;
      }

      // Multiply this cube with another Cube
      multiply(other) {
        this.centerMultiply(other);
        this.cornerMultiply(other);
        this.edgeMultiply(other);
        return this;
      }

      move(arg) {
        var face, k, l, len, move, power, ref, ref1, x;
        ref = parseAlg(arg);
        for (k = 0, len = ref.length; k < len; k++) {
          move = ref[k];
          face = move / 3 | 0;
          power = move % 3;
          for (x = l = 0, ref1 = power; (0 <= ref1 ? l <= ref1 : l >= ref1); x = 0 <= ref1 ? ++l : --l) {
            this.multiply(Cube.moves[face]);
          }
        }
        return this;
      }

      upright() {
        var clone, i, j, k, l, result;
        clone = this.clone();
        result = [];
        for (i = k = 0; k <= 5; i = ++k) {
          if (clone.center[i] === F) {
            break;
          }
        }
        switch (i) {
          case D:
            result.push("x");
            break;
          case U:
            result.push("x'");
            break;
          case B:
            result.push("x2");
            break;
          case R:
            result.push("y");
            break;
          case L:
            result.push("y'");
        }
        if (result.length) {
          clone.move(result[0]);
        }
        for (j = l = 0; l <= 5; j = ++l) {
          if (clone.center[j] === U) {
            break;
          }
        }
        switch (j) {
          case L:
            result.push("z");
            break;
          case R:
            result.push("z'");
            break;
          case D:
            result.push("z2");
        }
        return result.join(' ');
      }

      static inverse(arg) {
        var face, k, len, move, power, result, str;
        result = (function() {
          var k, len, ref, results;
          ref = parseAlg(arg);
          results = [];
          for (k = 0, len = ref.length; k < len; k++) {
            move = ref[k];
            face = move / 3 | 0;
            power = move % 3;
            results.push(face * 3 + -(power - 1) + 1);
          }
          return results;
        })();
        result.reverse();
        if (typeof arg === 'string') {
          str = '';
          for (k = 0, len = result.length; k < len; k++) {
            move = result[k];
            face = move / 3 | 0;
            power = move % 3;
            str += faceNames[face];
            if (power === 1) {
              str += '2';
            } else if (power === 2) {
              str += "'";
            }
            str += ' ';
          }
          return str.substring(0, str.length - 1);
        } else if (arg.length != null) {
          return result;
        } else {
          return result[0];
        }
      }

    };

    Cube.prototype.randomize = (function() {
      var arePermutationsValid, generateValidRandomOrientation, generateValidRandomPermutation, getNumSwaps, isOrientationValid, randint, randomizeOrientation, result, shuffle;
      randint = function(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
      };
      // Fisher-Yates shuffle adapted from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
      shuffle = function(array) {
        var currentIndex, randomIndex, temporaryValue;
        currentIndex = array.length;
        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
          // Pick a remaining element...
          randomIndex = randint(0, currentIndex - 1);
          currentIndex -= 1;
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
      };
      getNumSwaps = function(arr) {
        var cur, cycleLength, i, k, numSwaps, ref, seen, x;
        numSwaps = 0;
        seen = (function() {
          var k, ref, results;
          results = [];
          for (x = k = 0, ref = arr.length - 1; (0 <= ref ? k <= ref : k >= ref); x = 0 <= ref ? ++k : --k) {
            results.push(false);
          }
          return results;
        })();
        while (true) {
          // We compute the cycle decomposition
          cur = -1;
          for (i = k = 0, ref = arr.length - 1; (0 <= ref ? k <= ref : k >= ref); i = 0 <= ref ? ++k : --k) {
            if (!seen[i]) {
              cur = i;
              break;
            }
          }
          if (cur === -1) {
            break;
          }
          cycleLength = 0;
          while (!seen[cur]) {
            seen[cur] = true;
            cycleLength++;
            cur = arr[cur];
          }
          // A cycle is equivalent to cycleLength + 1 swaps
          numSwaps += cycleLength + 1;
        }
        return numSwaps;
      };
      arePermutationsValid = function(cp, ep) {
        var numSwaps;
        numSwaps = getNumSwaps(ep) + getNumSwaps(cp);
        return numSwaps % 2 === 0;
      };
      generateValidRandomPermutation = function(cp, ep) {
        // Each shuffle only takes around 12 operations and there's a 50%
        // chance of a valid permutation so it'll finish in very good time
        shuffle(ep);
        shuffle(cp);
        while (!arePermutationsValid(cp, ep)) {
          shuffle(ep);
          shuffle(cp);
        }
      };
      randomizeOrientation = function(arr, numOrientations) {
        var i, k, ori, ref;
        ori = 0;
        for (i = k = 0, ref = arr.length - 1; (0 <= ref ? k <= ref : k >= ref); i = 0 <= ref ? ++k : --k) {
          ori += (arr[i] = randint(0, numOrientations - 1));
        }
      };
      isOrientationValid = function(arr, numOrientations) {
        return arr.reduce(function(a, b) {
          return a + b;
        }) % numOrientations === 0;
      };
      generateValidRandomOrientation = function(co, eo) {
        // There is a 1/2 and 1/3 probably respectively of each of these
        // succeeding so the probability of them running 10 times before
        // success is already only 1% and only gets exponentially lower
        // and each generation is only in the 10s of operations which is nothing
        randomizeOrientation(co, 3);
        while (!isOrientationValid(co, 3)) {
          randomizeOrientation(co, 3);
        }
        randomizeOrientation(eo, 2);
        while (!isOrientationValid(eo, 2)) {
          randomizeOrientation(eo, 2);
        }
      };
      result = function() {
        generateValidRandomPermutation(this.cp, this.ep);
        generateValidRandomOrientation(this.co, this.eo);
        return this;
      };
      return result;
    })();

    Cube.moves = [
      {
        // U
        center: [0, 1, 2, 3, 4, 5],
        cp: [UBR,
      URF,
      UFL,
      ULB,
      DFR,
      DLF,
      DBL,
      DRB],
        co: [0,
      0,
      0,
      0,
      0,
      0,
      0,
      0],
        ep: [UB,
      UR,
      UF,
      UL,
      DR,
      DF,
      DL,
      DB,
      FR,
      FL,
      BL,
      BR],
        eo: [0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0]
      },
      {
        // R
        center: [0, 1, 2, 3, 4, 5],
        cp: [DFR,
      UFL,
      ULB,
      URF,
      DRB,
      DLF,
      DBL,
      UBR],
        co: [2,
      0,
      0,
      1,
      1,
      0,
      0,
      2],
        ep: [FR,
      UF,
      UL,
      UB,
      BR,
      DF,
      DL,
      DB,
      DR,
      FL,
      BL,
      UR],
        eo: [0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0]
      },
      {
        // F
        center: [0, 1, 2, 3, 4, 5],
        cp: [UFL,
      DLF,
      ULB,
      UBR,
      URF,
      DFR,
      DBL,
      DRB],
        co: [1,
      2,
      0,
      0,
      2,
      1,
      0,
      0],
        ep: [UR,
      FL,
      UL,
      UB,
      DR,
      FR,
      DL,
      DB,
      UF,
      DF,
      BL,
      BR],
        eo: [0,
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      1,
      1,
      0,
      0]
      },
      {
        // D
        center: [0, 1, 2, 3, 4, 5],
        cp: [URF,
      UFL,
      ULB,
      UBR,
      DLF,
      DBL,
      DRB,
      DFR],
        co: [0,
      0,
      0,
      0,
      0,
      0,
      0,
      0],
        ep: [UR,
      UF,
      UL,
      UB,
      DF,
      DL,
      DB,
      DR,
      FR,
      FL,
      BL,
      BR],
        eo: [0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0]
      },
      {
        // L
        center: [0, 1, 2, 3, 4, 5],
        cp: [URF,
      ULB,
      DBL,
      UBR,
      DFR,
      UFL,
      DLF,
      DRB],
        co: [0,
      1,
      2,
      0,
      0,
      2,
      1,
      0],
        ep: [UR,
      UF,
      BL,
      UB,
      DR,
      DF,
      FL,
      DB,
      FR,
      UL,
      DL,
      BR],
        eo: [0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0]
      },
      {
        // B
        center: [0, 1, 2, 3, 4, 5],
        cp: [URF,
      UFL,
      UBR,
      DRB,
      DFR,
      DLF,
      ULB,
      DBL],
        co: [0,
      0,
      1,
      2,
      0,
      0,
      2,
      1],
        ep: [UR,
      UF,
      UL,
      BR,
      DR,
      DF,
      DL,
      BL,
      FR,
      FL,
      UB,
      DB],
        eo: [0,
      0,
      0,
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      1,
      1]
      },
      {
        // E
        center: [U,
      F,
      L,
      D,
      B,
      R],
        cp: [URF,
      UFL,
      ULB,
      UBR,
      DFR,
      DLF,
      DBL,
      DRB],
        co: [0,
      0,
      0,
      0,
      0,
      0,
      0,
      0],
        ep: [UR,
      UF,
      UL,
      UB,
      DR,
      DF,
      DL,
      DB,
      FL,
      BL,
      BR,
      FR],
        eo: [0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1]
      },
      {
        // M
        center: [B,
      R,
      U,
      F,
      L,
      D],
        cp: [URF,
      UFL,
      ULB,
      UBR,
      DFR,
      DLF,
      DBL,
      DRB],
        co: [0,
      0,
      0,
      0,
      0,
      0,
      0,
      0],
        ep: [UR,
      UB,
      UL,
      DB,
      DR,
      UF,
      DL,
      DF,
      FR,
      FL,
      BL,
      BR],
        eo: [0,
      1,
      0,
      1,
      0,
      1,
      0,
      1,
      0,
      0,
      0,
      0]
      },
      {
        // S
        center: [L,
      U,
      F,
      R,
      D,
      B],
        cp: [URF,
      UFL,
      ULB,
      UBR,
      DFR,
      DLF,
      DBL,
      DRB],
        co: [0,
      0,
      0,
      0,
      0,
      0,
      0,
      0],
        ep: [UL,
      UF,
      DL,
      UB,
      UR,
      DF,
      DR,
      DB,
      FR,
      FL,
      BL,
      BR],
        eo: [1,
      0,
      1,
      0,
      1,
      0,
      1,
      0,
      0,
      0,
      0,
      0]
      }
    ];

    faceNums = {
      U: 0,
      R: 1,
      F: 2,
      D: 3,
      L: 4,
      B: 5,
      E: 6,
      M: 7,
      S: 8,
      x: 9,
      y: 10,
      z: 11,
      u: 12,
      r: 13,
      f: 14,
      d: 15,
      l: 16,
      b: 17
    };

    faceNames = {
      0: 'U',
      1: 'R',
      2: 'F',
      3: 'D',
      4: 'L',
      5: 'B',
      6: 'E',
      7: 'M',
      8: 'S',
      9: 'x',
      10: 'y',
      11: 'z',
      12: 'u',
      13: 'r',
      14: 'f',
      15: 'd',
      16: 'l',
      17: 'b'
    };

    parseAlg = function(arg) {
      var k, len, move, part, power, ref, results;
      if (typeof arg === 'string') {
        ref = arg.split(/\s+/);
        // String
        results = [];
        for (k = 0, len = ref.length; k < len; k++) {
          part = ref[k];
          if (part.length === 0) {
            // First and last can be empty
            continue;
          }
          if (part.length > 2) {
            throw new Error(`Invalid move: ${part}`);
          }
          move = faceNums[part[0]];
          if (move === void 0) {
            throw new Error(`Invalid move: ${part}`);
          }
          if (part.length === 1) {
            power = 0;
          } else {
            if (part[1] === '2') {
              power = 1;
            } else if (part[1] === "'") {
              power = 2;
            } else {
              throw new Error(`Invalid move: ${part}`);
            }
          }
          results.push(move * 3 + power);
        }
        return results;
      } else if (arg.length != null) {
        // Already an array
        return arg;
      } else {
        // A single move
        return [arg];
      }
    };

    // x
    Cube.moves.push(new Cube().move("R M' L'").toJSON());

    // y
    Cube.moves.push(new Cube().move("U E' D'").toJSON());

    // z
    Cube.moves.push(new Cube().move("F S B'").toJSON());

    // u
    Cube.moves.push(new Cube().move("U E'").toJSON());

    // r
    Cube.moves.push(new Cube().move("R M'").toJSON());

    // f
    Cube.moves.push(new Cube().move("F S").toJSON());

    // d
    Cube.moves.push(new Cube().move("D E").toJSON());

    // l
    Cube.moves.push(new Cube().move("L M").toJSON());

    // b
    Cube.moves.push(new Cube().move("B S'").toJSON());

    return Cube;

  }).call(this);

  //# Globals
  if ( true && module !== null) {
    module.exports = Cube;
  } else {
    this.Cube = Cube;
  }

}).call(this);


/***/ }),

/***/ "./node_modules/cubejs/lib/solve.js":
/*!******************************************!*\
  !*** ./node_modules/cubejs/lib/solve.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

(function() {
  var B, BL, BR, Cnk, Cube, D, DB, DBL, DF, DFR, DL, DLF, DR, DRB, F, FL, FR, Include, L, N_FLIP, N_FRtoBR, N_PARITY, N_SLICE1, N_SLICE2, N_TWIST, N_UBtoDF, N_URFtoDLF, N_URtoDF, N_URtoUL, R, U, UB, UBR, UF, UFL, UL, ULB, UR, URF, allMoves1, allMoves2, computeMoveTable, computePruningTable, faceNames, faceNums, factorial, key, max, mergeURtoDF, moveTableParams, nextMoves1, nextMoves2, permutationIndex, pruning, pruningTableParams, rotateLeft, rotateRight, value,
    indexOf = [].indexOf;

  Cube = this.Cube || __webpack_require__(/*! ./cube */ "./node_modules/cubejs/lib/cube.js");

  // Centers
  [U, R, F, D, L, B] = [0, 1, 2, 3, 4, 5];

  // Corners
  [URF, UFL, ULB, UBR, DFR, DLF, DBL, DRB] = [0, 1, 2, 3, 4, 5, 6, 7];

  // Edges
  [UR, UF, UL, UB, DR, DF, DL, DB, FR, FL, BL, BR] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  //# Helpers

  // n choose k, i.e. the binomial coeffiecient
  Cnk = function(n, k) {
    var i, j, s;
    if (n < k) {
      return 0;
    }
    if (k > n / 2) {
      k = n - k;
    }
    s = 1;
    i = n;
    j = 1;
    while (i !== n - k) {
      s *= i;
      s /= j;
      i--;
      j++;
    }
    return s;
  };

  // n!
  factorial = function(n) {
    var f, i, m, ref;
    f = 1;
    for (i = m = 2, ref = n; (2 <= ref ? m <= ref : m >= ref); i = 2 <= ref ? ++m : --m) {
      f *= i;
    }
    return f;
  };

  // Maximum of two values
  max = function(a, b) {
    if (a > b) {
      return a;
    } else {
      return b;
    }
  };

  // Rotate elements between l and r left by one place
  rotateLeft = function(array, l, r) {
    var i, m, ref, ref1, tmp;
    tmp = array[l];
    for (i = m = ref = l, ref1 = r - 1; (ref <= ref1 ? m <= ref1 : m >= ref1); i = ref <= ref1 ? ++m : --m) {
      array[i] = array[i + 1];
    }
    return array[r] = tmp;
  };

  // Rotate elements between l and r right by one place
  rotateRight = function(array, l, r) {
    var i, m, ref, ref1, tmp;
    tmp = array[r];
    for (i = m = ref = r, ref1 = l + 1; (ref <= ref1 ? m <= ref1 : m >= ref1); i = ref <= ref1 ? ++m : --m) {
      array[i] = array[i - 1];
    }
    return array[l] = tmp;
  };

  // Generate a function that computes permutation indices.

  // The permutation index actually encodes two indices: Combination,
  // i.e. positions of the cubies start..end (A) and their respective
  // permutation (B). The maximum value for B is

  //   maxB = (end - start + 1)!

  // and the index is A * maxB + B
  permutationIndex = function(context, start, end, fromEnd = false) {
    var i, maxAll, maxB, maxOur, our, permName;
    maxOur = end - start;
    maxB = factorial(maxOur + 1);
    if (context === 'corners') {
      maxAll = 7;
      permName = 'cp';
    } else {
      maxAll = 11;
      permName = 'ep';
    }
    our = (function() {
      var m, ref, results;
      results = [];
      for (i = m = 0, ref = maxOur; (0 <= ref ? m <= ref : m >= ref); i = 0 <= ref ? ++m : --m) {
        results.push(0);
      }
      return results;
    })();
    return function(index) {
      var a, b, c, j, k, m, o, p, perm, q, ref, ref1, ref10, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, t, u, w, x, y, z;
      if (index != null) {
        for (i = m = 0, ref = maxOur; (0 <= ref ? m <= ref : m >= ref); i = 0 <= ref ? ++m : --m) {
          // Reset our to [start..end]
          our[i] = i + start;
        }
        b = index % maxB; // permutation
        a = index / maxB | 0; // combination
        
        // Invalidate all edges
        perm = this[permName];
        for (i = o = 0, ref1 = maxAll; (0 <= ref1 ? o <= ref1 : o >= ref1); i = 0 <= ref1 ? ++o : --o) {
          perm[i] = -1;
        }
// Generate permutation from index b
        for (j = p = 1, ref2 = maxOur; (1 <= ref2 ? p <= ref2 : p >= ref2); j = 1 <= ref2 ? ++p : --p) {
          k = b % (j + 1);
          b = b / (j + 1) | 0;
          // TODO: Implement rotateRightBy(our, 0, j, k)
          while (k > 0) {
            rotateRight(our, 0, j);
            k--;
          }
        }
        // Generate combination and set our edges
        x = maxOur;
        if (fromEnd) {
          for (j = q = 0, ref3 = maxAll; (0 <= ref3 ? q <= ref3 : q >= ref3); j = 0 <= ref3 ? ++q : --q) {
            c = Cnk(maxAll - j, x + 1);
            if (a - c >= 0) {
              perm[j] = our[maxOur - x];
              a -= c;
              x--;
            }
          }
        } else {
          for (j = t = ref4 = maxAll; (ref4 <= 0 ? t <= 0 : t >= 0); j = ref4 <= 0 ? ++t : --t) {
            c = Cnk(j, x + 1);
            if (a - c >= 0) {
              perm[j] = our[x];
              a -= c;
              x--;
            }
          }
        }
        return this;
      } else {
        perm = this[permName];
        for (i = u = 0, ref5 = maxOur; (0 <= ref5 ? u <= ref5 : u >= ref5); i = 0 <= ref5 ? ++u : --u) {
          our[i] = -1;
        }
        a = b = x = 0;
        // Compute the index a < ((maxAll + 1) choose (maxOur + 1)) and
        // the permutation
        if (fromEnd) {
          for (j = w = ref6 = maxAll; (ref6 <= 0 ? w <= 0 : w >= 0); j = ref6 <= 0 ? ++w : --w) {
            if ((start <= (ref7 = perm[j]) && ref7 <= end)) {
              a += Cnk(maxAll - j, x + 1);
              our[maxOur - x] = perm[j];
              x++;
            }
          }
        } else {
          for (j = y = 0, ref8 = maxAll; (0 <= ref8 ? y <= ref8 : y >= ref8); j = 0 <= ref8 ? ++y : --y) {
            if ((start <= (ref9 = perm[j]) && ref9 <= end)) {
              a += Cnk(j, x + 1);
              our[x] = perm[j];
              x++;
            }
          }
        }
// Compute the index b < (maxOur + 1)! for the permutation
        for (j = z = ref10 = maxOur; (ref10 <= 0 ? z <= 0 : z >= 0); j = ref10 <= 0 ? ++z : --z) {
          k = 0;
          while (our[j] !== start + j) {
            rotateLeft(our, 0, j);
            k++;
          }
          b = (j + 1) * b + k;
        }
        return a * maxB + b;
      }
    };
  };

  Include = {
    // The twist of the 8 corners, 0 <= twist < 3^7. The orientation of
    // the DRB corner is fully determined by the orientation of the other
    // corners.
    twist: function(twist) {
      var i, m, o, ori, parity, v;
      if (twist != null) {
        parity = 0;
        for (i = m = 6; m >= 0; i = --m) {
          ori = twist % 3;
          twist = (twist / 3) | 0;
          this.co[i] = ori;
          parity += ori;
        }
        this.co[7] = (3 - parity % 3) % 3;
        return this;
      } else {
        v = 0;
        for (i = o = 0; o <= 6; i = ++o) {
          v = 3 * v + this.co[i];
        }
        return v;
      }
    },
    // The flip of the 12 edges, 0 <= flip < 2^11. The orientation of the
    // BR edge is fully determined by the orientation of the other edges.
    flip: function(flip) {
      var i, m, o, ori, parity, v;
      if (flip != null) {
        parity = 0;
        for (i = m = 10; m >= 0; i = --m) {
          ori = flip % 2;
          flip = flip / 2 | 0;
          this.eo[i] = ori;
          parity += ori;
        }
        this.eo[11] = (2 - parity % 2) % 2;
        return this;
      } else {
        v = 0;
        for (i = o = 0; o <= 10; i = ++o) {
          v = 2 * v + this.eo[i];
        }
        return v;
      }
    },
    // Parity of the corner permutation
    cornerParity: function() {
      var i, j, m, o, ref, ref1, ref2, ref3, s;
      s = 0;
      for (i = m = ref = DRB, ref1 = URF + 1; (ref <= ref1 ? m <= ref1 : m >= ref1); i = ref <= ref1 ? ++m : --m) {
        for (j = o = ref2 = i - 1, ref3 = URF; (ref2 <= ref3 ? o <= ref3 : o >= ref3); j = ref2 <= ref3 ? ++o : --o) {
          if (this.cp[j] > this.cp[i]) {
            s++;
          }
        }
      }
      return s % 2;
    },
    // Parity of the edges permutation. Parity of corners and edges are
    // the same if the cube is solvable.
    edgeParity: function() {
      var i, j, m, o, ref, ref1, ref2, ref3, s;
      s = 0;
      for (i = m = ref = BR, ref1 = UR + 1; (ref <= ref1 ? m <= ref1 : m >= ref1); i = ref <= ref1 ? ++m : --m) {
        for (j = o = ref2 = i - 1, ref3 = UR; (ref2 <= ref3 ? o <= ref3 : o >= ref3); j = ref2 <= ref3 ? ++o : --o) {
          if (this.ep[j] > this.ep[i]) {
            s++;
          }
        }
      }
      return s % 2;
    },
    // Permutation of the six corners URF, UFL, ULB, UBR, DFR, DLF
    URFtoDLF: permutationIndex('corners', URF, DLF),
    // Permutation of the three edges UR, UF, UL
    URtoUL: permutationIndex('edges', UR, UL),
    // Permutation of the three edges UB, DR, DF
    UBtoDF: permutationIndex('edges', UB, DF),
    // Permutation of the six edges UR, UF, UL, UB, DR, DF
    URtoDF: permutationIndex('edges', UR, DF),
    // Permutation of the equator slice edges FR, FL, BL and BR
    FRtoBR: permutationIndex('edges', FR, BR, true)
  };

  for (key in Include) {
    value = Include[key];
    Cube.prototype[key] = value;
  }

  computeMoveTable = function(context, coord, size) {
    var apply, cube, i, inner, j, k, m, move, o, p, ref, results;
    // Loop through all valid values for the coordinate, setting cube's
    // state in each iteration. Then apply each of the 18 moves to the
    // cube, and compute the resulting coordinate.
    apply = context === 'corners' ? 'cornerMultiply' : 'edgeMultiply';
    cube = new Cube;
    results = [];
    for (i = m = 0, ref = size - 1; (0 <= ref ? m <= ref : m >= ref); i = 0 <= ref ? ++m : --m) {
      cube[coord](i);
      inner = [];
      for (j = o = 0; o <= 5; j = ++o) {
        move = Cube.moves[j];
        for (k = p = 0; p <= 2; k = ++p) {
          cube[apply](move);
          inner.push(cube[coord]());
        }
        // 4th face turn restores the cube
        cube[apply](move);
      }
      results.push(inner);
    }
    return results;
  };

  // Because we only have the phase 2 URtoDF coordinates, we need to
  // merge the URtoUL and UBtoDF coordinates to URtoDF in the beginning
  // of phase 2.
  mergeURtoDF = (function() {
    var a, b;
    a = new Cube;
    b = new Cube;
    return function(URtoUL, UBtoDF) {
      var i, m;
      // Collisions can be found because unset are set to -1
      a.URtoUL(URtoUL);
      b.UBtoDF(UBtoDF);
      for (i = m = 0; m <= 7; i = ++m) {
        if (a.ep[i] !== -1) {
          if (b.ep[i] !== -1) {
            return -1; // collision
          } else {
            b.ep[i] = a.ep[i];
          }
        }
      }
      return b.URtoDF();
    };
  })();

  N_TWIST = 2187; // 3^7 corner orientations

  N_FLIP = 2048; // 2^11 possible edge flips

  N_PARITY = 2; // 2 possible parities

  N_FRtoBR = 11880; // 12!/(12-4)! permutations of FR..BR edges

  N_SLICE1 = 495; // (12 choose 4) possible positions of FR..BR edges

  N_SLICE2 = 24; // 4! permutations of FR..BR edges in phase 2

  N_URFtoDLF = 20160; // 8!/(8-6)! permutations of URF..DLF corners

  
  // The URtoDF move table is only computed for phase 2 because the full
  // table would have >650000 entries
  N_URtoDF = 20160; // 8!/(8-6)! permutation of UR..DF edges in phase 2

  N_URtoUL = 1320; // 12!/(12-3)! permutations of UR..UL edges

  N_UBtoDF = 1320; // 12!/(12-3)! permutations of UB..DF edges

  
  // The move table for parity is so small that it's included here
  Cube.moveTables = {
    parity: [[1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1], [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0]],
    twist: null,
    flip: null,
    FRtoBR: null,
    URFtoDLF: null,
    URtoDF: null,
    URtoUL: null,
    UBtoDF: null,
    mergeURtoDF: null
  };

  // Other move tables are computed on the fly
  moveTableParams = {
    // name: [scope, size]
    twist: ['corners', N_TWIST],
    flip: ['edges', N_FLIP],
    FRtoBR: ['edges', N_FRtoBR],
    URFtoDLF: ['corners', N_URFtoDLF],
    URtoDF: ['edges', N_URtoDF],
    URtoUL: ['edges', N_URtoUL],
    UBtoDF: ['edges', N_UBtoDF],
    mergeURtoDF: []
  };

  Cube.computeMoveTables = function(...tables) {
    var len, m, name, scope, size, tableName;
    if (tables.length === 0) {
      tables = (function() {
        var results;
        results = [];
        for (name in moveTableParams) {
          results.push(name);
        }
        return results;
      })();
    }
    for (m = 0, len = tables.length; m < len; m++) {
      tableName = tables[m];
      if (this.moveTables[tableName] !== null) {
        // Already computed
        continue;
      }
      if (tableName === 'mergeURtoDF') {
        this.moveTables.mergeURtoDF = (function() {
          var UBtoDF, URtoUL, o, results;
          results = [];
          for (URtoUL = o = 0; o <= 335; URtoUL = ++o) {
            results.push((function() {
              var p, results1;
              results1 = [];
              for (UBtoDF = p = 0; p <= 335; UBtoDF = ++p) {
                results1.push(mergeURtoDF(URtoUL, UBtoDF));
              }
              return results1;
            })());
          }
          return results;
        })();
      } else {
        [scope, size] = moveTableParams[tableName];
        this.moveTables[tableName] = computeMoveTable(scope, tableName, size);
      }
    }
    return this;
  };

  // Phase 1: All moves are valid
  allMoves1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

  // The list of next valid phase 1 moves when the given face was turned
  // in the last move
  nextMoves1 = (function() {
    var face, lastFace, m, next, o, p, power, results;
    results = [];
    for (lastFace = m = 0; m <= 5; lastFace = ++m) {
      next = [];
// Don't allow commuting moves, e.g. U U'. Also make sure that
// opposite faces are always moved in the same order, i.e. allow
// U D but no D U. This avoids sequences like U D U'.
      for (face = o = 0; o <= 5; face = ++o) {
        if (face !== lastFace && face !== lastFace - 3) {
// single, double or inverse move
          for (power = p = 0; p <= 2; power = ++p) {
            next.push(face * 3 + power);
          }
        }
      }
      results.push(next);
    }
    return results;
  })();

  // Phase 2: Double moves of all faces plus quarter moves of U and D
  allMoves2 = [0, 1, 2, 4, 7, 9, 10, 11, 13, 16];

  nextMoves2 = (function() {
    var face, lastFace, len, m, next, o, p, power, powers, results;
    results = [];
    for (lastFace = m = 0; m <= 5; lastFace = ++m) {
      next = [];
      for (face = o = 0; o <= 5; face = ++o) {
        if (!(face !== lastFace && face !== lastFace - 3)) {
          continue;
        }
        // Allow all moves of U and D and double moves of others
        powers = face === 0 || face === 3 ? [0, 1, 2] : [1];
        for (p = 0, len = powers.length; p < len; p++) {
          power = powers[p];
          next.push(face * 3 + power);
        }
      }
      results.push(next);
    }
    return results;
  })();

  // 8 values are encoded in one number
  pruning = function(table, index, value) {
    var pos, shift, slot;
    pos = index % 8;
    slot = index >> 3;
    shift = pos << 2;
    if (value != null) {
      // Set
      table[slot] &= ~(0xF << shift);
      table[slot] |= value << shift;
      return value;
    } else {
      // Get
      return (table[slot] & (0xF << shift)) >>> shift;
    }
  };

  computePruningTable = function(phase, size, currentCoords, nextIndex) {
    var current, depth, done, index, len, m, move, moves, next, o, ref, table, x;
    // Initialize all values to 0xF
    table = (function() {
      var m, ref, results;
      results = [];
      for (x = m = 0, ref = Math.ceil(size / 8) - 1; (0 <= ref ? m <= ref : m >= ref); x = 0 <= ref ? ++m : --m) {
        results.push(0xFFFFFFFF);
      }
      return results;
    })();
    if (phase === 1) {
      moves = allMoves1;
    } else {
      moves = allMoves2;
    }
    depth = 0;
    pruning(table, 0, depth);
    done = 1;
    // In each iteration, take each state found in the previous depth and
    // compute the next state. Stop when all states have been assigned a
    // depth.
    while (done !== size) {
      for (index = m = 0, ref = size - 1; (0 <= ref ? m <= ref : m >= ref); index = 0 <= ref ? ++m : --m) {
        if (!(pruning(table, index) === depth)) {
          continue;
        }
        current = currentCoords(index);
        for (o = 0, len = moves.length; o < len; o++) {
          move = moves[o];
          next = nextIndex(current, move);
          if (pruning(table, next) === 0xF) {
            pruning(table, next, depth + 1);
            done++;
          }
        }
      }
      depth++;
    }
    return table;
  };

  Cube.pruningTables = {
    sliceTwist: null,
    sliceFlip: null,
    sliceURFtoDLFParity: null,
    sliceURtoDFParity: null
  };

  pruningTableParams = {
    // name: [phase, size, currentCoords, nextIndex]
    sliceTwist: [
      1,
      N_SLICE1 * N_TWIST,
      function(index) {
        return [index % N_SLICE1,
      index / N_SLICE1 | 0];
      },
      function(current,
      move) {
        var newSlice,
      newTwist,
      slice,
      twist;
        [slice,
      twist] = current;
        newSlice = Cube.moveTables.FRtoBR[slice * 24][move] / 24 | 0;
        newTwist = Cube.moveTables.twist[twist][move];
        return newTwist * N_SLICE1 + newSlice;
      }
    ],
    sliceFlip: [
      1,
      N_SLICE1 * N_FLIP,
      function(index) {
        return [index % N_SLICE1,
      index / N_SLICE1 | 0];
      },
      function(current,
      move) {
        var flip,
      newFlip,
      newSlice,
      slice;
        [slice,
      flip] = current;
        newSlice = Cube.moveTables.FRtoBR[slice * 24][move] / 24 | 0;
        newFlip = Cube.moveTables.flip[flip][move];
        return newFlip * N_SLICE1 + newSlice;
      }
    ],
    sliceURFtoDLFParity: [
      2,
      N_SLICE2 * N_URFtoDLF * N_PARITY,
      function(index) {
        return [index % 2,
      (index / 2 | 0) % N_SLICE2,
      (index / 2 | 0) / N_SLICE2 | 0];
      },
      function(current,
      move) {
        var URFtoDLF,
      newParity,
      newSlice,
      newURFtoDLF,
      parity,
      slice;
        [parity,
      slice,
      URFtoDLF] = current;
        newParity = Cube.moveTables.parity[parity][move];
        newSlice = Cube.moveTables.FRtoBR[slice][move];
        newURFtoDLF = Cube.moveTables.URFtoDLF[URFtoDLF][move];
        return (newURFtoDLF * N_SLICE2 + newSlice) * 2 + newParity;
      }
    ],
    sliceURtoDFParity: [
      2,
      N_SLICE2 * N_URtoDF * N_PARITY,
      function(index) {
        return [index % 2,
      (index / 2 | 0) % N_SLICE2,
      (index / 2 | 0) / N_SLICE2 | 0];
      },
      function(current,
      move) {
        var URtoDF,
      newParity,
      newSlice,
      newURtoDF,
      parity,
      slice;
        [parity,
      slice,
      URtoDF] = current;
        newParity = Cube.moveTables.parity[parity][move];
        newSlice = Cube.moveTables.FRtoBR[slice][move];
        newURtoDF = Cube.moveTables.URtoDF[URtoDF][move];
        return (newURtoDF * N_SLICE2 + newSlice) * 2 + newParity;
      }
    ]
  };

  Cube.computePruningTables = function(...tables) {
    var len, m, name, params, tableName;
    if (tables.length === 0) {
      tables = (function() {
        var results;
        results = [];
        for (name in pruningTableParams) {
          results.push(name);
        }
        return results;
      })();
    }
    for (m = 0, len = tables.length; m < len; m++) {
      tableName = tables[m];
      if (this.pruningTables[tableName] !== null) {
        // Already computed
        continue;
      }
      params = pruningTableParams[tableName];
      this.pruningTables[tableName] = computePruningTable(...params);
    }
    return this;
  };

  Cube.initSolver = function() {
    Cube.computeMoveTables();
    return Cube.computePruningTables();
  };

  Cube.prototype.solveUpright = function(maxDepth = 22) {
    var State, freeStates, moveNames, phase1, phase1search, phase2, phase2search, solution, state, x;
    // Names for all moves, i.e. U, U2, U', F, F2, ...
    moveNames = (function() {
      var face, faceName, m, o, power, powerName, result;
      faceName = ['U', 'R', 'F', 'D', 'L', 'B'];
      powerName = ['', '2', "'"];
      result = [];
      for (face = m = 0; m <= 5; face = ++m) {
        for (power = o = 0; o <= 2; power = ++o) {
          result.push(faceName[face] + powerName[power]);
        }
      }
      return result;
    })();
    State = class State {
      constructor(cube) {
        this.parent = null;
        this.lastMove = null;
        this.depth = 0;
        if (cube) {
          this.init(cube);
        }
      }

      init(cube) {
        // Phase 1 coordinates
        this.flip = cube.flip();
        this.twist = cube.twist();
        this.slice = cube.FRtoBR() / N_SLICE2 | 0;
        // Phase 2 coordinates
        this.parity = cube.cornerParity();
        this.URFtoDLF = cube.URFtoDLF();
        this.FRtoBR = cube.FRtoBR();
        // These are later merged to URtoDF when phase 2 begins
        this.URtoUL = cube.URtoUL();
        this.UBtoDF = cube.UBtoDF();
        return this;
      }

      solution() {
        if (this.parent) {
          return this.parent.solution() + moveNames[this.lastMove] + ' ';
        } else {
          return '';
        }
      }

      //# Helpers
      move(table, index, move) {
        return Cube.moveTables[table][index][move];
      }

      pruning(table, index) {
        return pruning(Cube.pruningTables[table], index);
      }

      //# Phase 1

      // Return the next valid phase 1 moves for this state
      moves1() {
        if (this.lastMove !== null) {
          return nextMoves1[this.lastMove / 3 | 0];
        } else {
          return allMoves1;
        }
      }

      // Compute the minimum number of moves to the end of phase 1
      minDist1() {
        var d1, d2;
        // The maximum number of moves to the end of phase 1 wrt. the
        // combination flip and slice coordinates only
        d1 = this.pruning('sliceFlip', N_SLICE1 * this.flip + this.slice);
        // The combination of twist and slice coordinates
        d2 = this.pruning('sliceTwist', N_SLICE1 * this.twist + this.slice);
        // The true minimal distance is the maximum of these two
        return max(d1, d2);
      }

      // Compute the next phase 1 state for the given move
      next1(move) {
        var next;
        next = freeStates.pop();
        next.parent = this;
        next.lastMove = move;
        next.depth = this.depth + 1;
        next.flip = this.move('flip', this.flip, move);
        next.twist = this.move('twist', this.twist, move);
        next.slice = this.move('FRtoBR', this.slice * 24, move) / 24 | 0;
        return next;
      }

      //# Phase 2

      // Return the next valid phase 2 moves for this state
      moves2() {
        if (this.lastMove !== null) {
          return nextMoves2[this.lastMove / 3 | 0];
        } else {
          return allMoves2;
        }
      }

      // Compute the minimum number of moves to the solved cube
      minDist2() {
        var d1, d2, index1, index2;
        index1 = (N_SLICE2 * this.URtoDF + this.FRtoBR) * N_PARITY + this.parity;
        d1 = this.pruning('sliceURtoDFParity', index1);
        index2 = (N_SLICE2 * this.URFtoDLF + this.FRtoBR) * N_PARITY + this.parity;
        d2 = this.pruning('sliceURFtoDLFParity', index2);
        return max(d1, d2);
      }

      // Initialize phase 2 coordinates
      init2(top = true) {
        if (this.parent === null) {
          return;
        }
        // For other states, the phase 2 state is computed based on
        // parent's state.
        // Already assigned for the initial state
        this.parent.init2(false);
        this.URFtoDLF = this.move('URFtoDLF', this.parent.URFtoDLF, this.lastMove);
        this.FRtoBR = this.move('FRtoBR', this.parent.FRtoBR, this.lastMove);
        this.parity = this.move('parity', this.parent.parity, this.lastMove);
        this.URtoUL = this.move('URtoUL', this.parent.URtoUL, this.lastMove);
        this.UBtoDF = this.move('UBtoDF', this.parent.UBtoDF, this.lastMove);
        if (top) {
          // This is the initial phase 2 state. Get the URtoDF coordinate
          // by merging URtoUL and UBtoDF
          return this.URtoDF = this.move('mergeURtoDF', this.URtoUL, this.UBtoDF);
        }
      }

      // Compute the next phase 2 state for the given move
      next2(move) {
        var next;
        next = freeStates.pop();
        next.parent = this;
        next.lastMove = move;
        next.depth = this.depth + 1;
        next.URFtoDLF = this.move('URFtoDLF', this.URFtoDLF, move);
        next.FRtoBR = this.move('FRtoBR', this.FRtoBR, move);
        next.parity = this.move('parity', this.parity, move);
        next.URtoDF = this.move('URtoDF', this.URtoDF, move);
        return next;
      }

    };
    solution = null;
    phase1search = function(state) {
      var depth, m, ref, results;
      depth = 0;
      results = [];
      for (depth = m = 1, ref = maxDepth; (1 <= ref ? m <= ref : m >= ref); depth = 1 <= ref ? ++m : --m) {
        phase1(state, depth);
        if (solution !== null) {
          break;
        }
        results.push(depth++);
      }
      return results;
    };
    phase1 = function(state, depth) {
      var len, m, move, next, ref, ref1, results;
      if (depth === 0) {
        if (state.minDist1() === 0) {
          // Make sure we don't start phase 2 with a phase 2 move as the
          // last move in phase 1, because phase 2 would then repeat the
          // same move.
          if (state.lastMove === null || (ref = state.lastMove, indexOf.call(allMoves2, ref) < 0)) {
            return phase2search(state);
          }
        }
      } else if (depth > 0) {
        if (state.minDist1() <= depth) {
          ref1 = state.moves1();
          results = [];
          for (m = 0, len = ref1.length; m < len; m++) {
            move = ref1[m];
            next = state.next1(move);
            phase1(next, depth - 1);
            freeStates.push(next);
            if (solution !== null) {
              break;
            } else {
              results.push(void 0);
            }
          }
          return results;
        }
      }
    };
    phase2search = function(state) {
      var depth, m, ref, results;
      // Initialize phase 2 coordinates
      state.init2();
      results = [];
      for (depth = m = 1, ref = maxDepth - state.depth; (1 <= ref ? m <= ref : m >= ref); depth = 1 <= ref ? ++m : --m) {
        phase2(state, depth);
        if (solution !== null) {
          break;
        }
        results.push(depth++);
      }
      return results;
    };
    phase2 = function(state, depth) {
      var len, m, move, next, ref, results;
      if (depth === 0) {
        if (state.minDist2() === 0) {
          return solution = state.solution();
        }
      } else if (depth > 0) {
        if (state.minDist2() <= depth) {
          ref = state.moves2();
          results = [];
          for (m = 0, len = ref.length; m < len; m++) {
            move = ref[m];
            next = state.next2(move);
            phase2(next, depth - 1);
            freeStates.push(next);
            if (solution !== null) {
              break;
            } else {
              results.push(void 0);
            }
          }
          return results;
        }
      }
    };
    freeStates = (function() {
      var m, ref, results;
      results = [];
      for (x = m = 0, ref = maxDepth + 1; (0 <= ref ? m <= ref : m >= ref); x = 0 <= ref ? ++m : --m) {
        results.push(new State);
      }
      return results;
    })();
    state = freeStates.pop().init(this);
    phase1search(state);
    freeStates.push(state);
    // Trim the trailing space
    if (solution.length > 0) {
      solution = solution.substring(0, solution.length - 1);
    }
    return solution;
  };

  faceNums = {
    U: 0,
    R: 1,
    F: 2,
    D: 3,
    L: 4,
    B: 5
  };

  faceNames = {
    0: 'U',
    1: 'R',
    2: 'F',
    3: 'D',
    4: 'L',
    5: 'B'
  };

  Cube.prototype.solve = function(maxDepth = 22) {
    var clone, len, m, move, ref, rotation, solution, upright, uprightSolution;
    clone = this.clone();
    upright = clone.upright();
    clone.move(upright);
    rotation = new Cube().move(upright).center;
    uprightSolution = clone.solveUpright(maxDepth);
    solution = [];
    ref = uprightSolution.split(' ');
    for (m = 0, len = ref.length; m < len; m++) {
      move = ref[m];
      solution.push(faceNames[rotation[faceNums[move[0]]]]);
      if (move.length > 1) {
        solution[solution.length - 1] += move[1];
      }
    }
    return solution.join(' ');
  };

  Cube.scramble = function() {
    return Cube.inverse(Cube.random().solve());
  };

}).call(this);


/***/ }),

/***/ "./src/preload/cubejs.ts":
/*!*******************************!*\
  !*** ./src/preload/cubejs.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Cube": () => (/* binding */ Cube)
/* harmony export */ });
const Cube = __webpack_require__(/*! cubejs */ "./node_modules/cubejs/index.js");
Cube.initSolver();


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX3ByZWxvYWRfY3ViZWpzX3RzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsMkZBQXNDO0FBQ3RDLG1CQUFPLENBQUMsdURBQWE7Ozs7Ozs7Ozs7OztBQ0RyQjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLFFBQVE7QUFDbEM7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixRQUFRO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsU0FBUztBQUNuQztBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLFFBQVE7QUFDbEM7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixTQUFTO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLFFBQVE7QUFDbEM7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLFNBQVM7QUFDbkM7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQztBQUNBO0FBQ0Esd0JBQXdCLFFBQVE7QUFDaEM7QUFDQTtBQUNBLDBCQUEwQixRQUFRO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixTQUFTO0FBQ2pDO0FBQ0E7QUFDQSwwQkFBMEIsUUFBUTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixRQUFRO0FBQ2hDLDBCQUEwQixRQUFRO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQyw0QkFBNEIsUUFBUTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsUUFBUTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsU0FBUztBQUNqQywwQkFBMEIsU0FBUztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixRQUFRO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFFBQVE7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsU0FBUztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLFFBQVE7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixRQUFRO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLFNBQVM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsU0FBUztBQUMvQztBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MscUNBQXFDO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFFBQVE7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLFNBQVM7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxTQUFTO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxrQ0FBa0M7QUFDbEY7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxrQ0FBa0M7QUFDbEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsa0NBQWtDO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsa0NBQWtDO0FBQ3ZGO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxrQ0FBa0M7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsU0FBUztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EscUNBQXFDLFNBQVM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixRQUFRO0FBQ2pDLDRCQUE0QixRQUFRO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLGtDQUFrQztBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsU0FBUztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELGtDQUFrQztBQUMxRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxTQUFTO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxrQ0FBa0M7QUFDNUU7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLFNBQVM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQzE3Qk0sYUFBYSxtQkFBTyxDQUFDLDhDQUFRO0FBQ3BDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL25vZGVfbW9kdWxlcy9jdWJlanMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL25vZGVfbW9kdWxlcy9jdWJlanMvbGliL2N1YmUuanMiLCJ3ZWJwYWNrOi8vcnViaWtzY3ViZS8uL25vZGVfbW9kdWxlcy9jdWJlanMvbGliL3NvbHZlLmpzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9zcmMvcHJlbG9hZC9jdWJlanMudHMiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9jdWJlJyk7XG5yZXF1aXJlKCcuL2xpYi9zb2x2ZScpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAvLyBDZW50ZXJzXG4gIHZhciBCLCBCTCwgQlIsIEN1YmUsIEQsIERCLCBEQkwsIERGLCBERlIsIERMLCBETEYsIERSLCBEUkIsIEYsIEZMLCBGUiwgTCwgUiwgVSwgVUIsIFVCUiwgVUYsIFVGTCwgVUwsIFVMQiwgVVIsIFVSRiwgY2VudGVyQ29sb3IsIGNlbnRlckZhY2VsZXQsIGNvcm5lckNvbG9yLCBjb3JuZXJGYWNlbGV0LCBlZGdlQ29sb3IsIGVkZ2VGYWNlbGV0O1xuXG4gIFtVLCBSLCBGLCBELCBMLCBCXSA9IFswLCAxLCAyLCAzLCA0LCA1XTtcblxuICAvLyBDb3JuZXJzXG4gIFtVUkYsIFVGTCwgVUxCLCBVQlIsIERGUiwgRExGLCBEQkwsIERSQl0gPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgN107XG5cbiAgLy8gRWRnZXNcbiAgW1VSLCBVRiwgVUwsIFVCLCBEUiwgREYsIERMLCBEQiwgRlIsIEZMLCBCTCwgQlJdID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMV07XG5cbiAgW2NlbnRlckZhY2VsZXQsIGNvcm5lckZhY2VsZXQsIGVkZ2VGYWNlbGV0XSA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgX0IsIF9ELCBfRiwgX0wsIF9SLCBfVTtcbiAgICBfVSA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiB4IC0gMTtcbiAgICB9O1xuICAgIF9SID0gZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIF9VKDkpICsgeDtcbiAgICB9O1xuICAgIF9GID0gZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIF9SKDkpICsgeDtcbiAgICB9O1xuICAgIF9EID0gZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIF9GKDkpICsgeDtcbiAgICB9O1xuICAgIF9MID0gZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIF9EKDkpICsgeDtcbiAgICB9O1xuICAgIF9CID0gZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIF9MKDkpICsgeDtcbiAgICB9O1xuICAgIHJldHVybiBbXG4gICAgICAvLyBDZW50ZXJzXG4gICAgICBbNCxcbiAgICAgIDEzLFxuICAgICAgMjIsXG4gICAgICAzMSxcbiAgICAgIDQwLFxuICAgICAgNDldLFxuICAgICAgLy8gQ29ybmVyc1xuICAgICAgW1tfVSg5KSxcbiAgICAgIF9SKDEpLFxuICAgICAgX0YoMyldLFxuICAgICAgW19VKDcpLFxuICAgICAgX0YoMSksXG4gICAgICBfTCgzKV0sXG4gICAgICBbX1UoMSksXG4gICAgICBfTCgxKSxcbiAgICAgIF9CKDMpXSxcbiAgICAgIFtfVSgzKSxcbiAgICAgIF9CKDEpLFxuICAgICAgX1IoMyldLFxuICAgICAgW19EKDMpLFxuICAgICAgX0YoOSksXG4gICAgICBfUig3KV0sXG4gICAgICBbX0QoMSksXG4gICAgICBfTCg5KSxcbiAgICAgIF9GKDcpXSxcbiAgICAgIFtfRCg3KSxcbiAgICAgIF9CKDkpLFxuICAgICAgX0woNyldLFxuICAgICAgW19EKDkpLFxuICAgICAgX1IoOSksXG4gICAgICBfQig3KV1dLFxuICAgICAgLy8gRWRnZXNcbiAgICAgIFtbX1UoNiksXG4gICAgICBfUigyKV0sXG4gICAgICBbX1UoOCksXG4gICAgICBfRigyKV0sXG4gICAgICBbX1UoNCksXG4gICAgICBfTCgyKV0sXG4gICAgICBbX1UoMiksXG4gICAgICBfQigyKV0sXG4gICAgICBbX0QoNiksXG4gICAgICBfUig4KV0sXG4gICAgICBbX0QoMiksXG4gICAgICBfRig4KV0sXG4gICAgICBbX0QoNCksXG4gICAgICBfTCg4KV0sXG4gICAgICBbX0QoOCksXG4gICAgICBfQig4KV0sXG4gICAgICBbX0YoNiksXG4gICAgICBfUig0KV0sXG4gICAgICBbX0YoNCksXG4gICAgICBfTCg2KV0sXG4gICAgICBbX0IoNiksXG4gICAgICBfTCg0KV0sXG4gICAgICBbX0IoNCksXG4gICAgICBfUig2KV1dXG4gICAgXTtcbiAgfSkoKTtcblxuICBjZW50ZXJDb2xvciA9IFsnVScsICdSJywgJ0YnLCAnRCcsICdMJywgJ0InXTtcblxuICBjb3JuZXJDb2xvciA9IFtbJ1UnLCAnUicsICdGJ10sIFsnVScsICdGJywgJ0wnXSwgWydVJywgJ0wnLCAnQiddLCBbJ1UnLCAnQicsICdSJ10sIFsnRCcsICdGJywgJ1InXSwgWydEJywgJ0wnLCAnRiddLCBbJ0QnLCAnQicsICdMJ10sIFsnRCcsICdSJywgJ0InXV07XG5cbiAgZWRnZUNvbG9yID0gW1snVScsICdSJ10sIFsnVScsICdGJ10sIFsnVScsICdMJ10sIFsnVScsICdCJ10sIFsnRCcsICdSJ10sIFsnRCcsICdGJ10sIFsnRCcsICdMJ10sIFsnRCcsICdCJ10sIFsnRicsICdSJ10sIFsnRicsICdMJ10sIFsnQicsICdMJ10sIFsnQicsICdSJ11dO1xuXG4gIEN1YmUgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGZhY2VOYW1lcywgZmFjZU51bXMsIHBhcnNlQWxnO1xuXG4gICAgY2xhc3MgQ3ViZSB7XG4gICAgICBjb25zdHJ1Y3RvcihvdGhlcikge1xuICAgICAgICB2YXIgeDtcbiAgICAgICAgaWYgKG90aGVyICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLmluaXQob3RoZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuaWRlbnRpdHkoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBGb3IgbW92ZXMgdG8gYXZvaWQgYWxsb2NhdGluZyBuZXcgb2JqZWN0cyBlYWNoIHRpbWVcbiAgICAgICAgdGhpcy5uZXdDZW50ZXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGssIHJlc3VsdHM7XG4gICAgICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgICAgIGZvciAoeCA9IGsgPSAwOyBrIDw9IDU7IHggPSArK2spIHtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaCgwKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIH0pKCk7XG4gICAgICAgIHRoaXMubmV3Q3AgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGssIHJlc3VsdHM7XG4gICAgICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgICAgIGZvciAoeCA9IGsgPSAwOyBrIDw9IDc7IHggPSArK2spIHtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaCgwKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIH0pKCk7XG4gICAgICAgIHRoaXMubmV3RXAgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGssIHJlc3VsdHM7XG4gICAgICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgICAgIGZvciAoeCA9IGsgPSAwOyBrIDw9IDExOyB4ID0gKytrKSB7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2goMCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICB9KSgpO1xuICAgICAgICB0aGlzLm5ld0NvID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBrLCByZXN1bHRzO1xuICAgICAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgICBmb3IgKHggPSBrID0gMDsgayA8PSA3OyB4ID0gKytrKSB7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2goMCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICB9KSgpO1xuICAgICAgICB0aGlzLm5ld0VvID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBrLCByZXN1bHRzO1xuICAgICAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgICBmb3IgKHggPSBrID0gMDsgayA8PSAxMTsgeCA9ICsraykge1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKDApO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgfSkoKTtcbiAgICAgIH1cblxuICAgICAgaW5pdChzdGF0ZSkge1xuICAgICAgICB0aGlzLmNlbnRlciA9IHN0YXRlLmNlbnRlci5zbGljZSgwKTtcbiAgICAgICAgdGhpcy5jbyA9IHN0YXRlLmNvLnNsaWNlKDApO1xuICAgICAgICB0aGlzLmVwID0gc3RhdGUuZXAuc2xpY2UoMCk7XG4gICAgICAgIHRoaXMuY3AgPSBzdGF0ZS5jcC5zbGljZSgwKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW8gPSBzdGF0ZS5lby5zbGljZSgwKTtcbiAgICAgIH1cblxuICAgICAgaWRlbnRpdHkoKSB7XG4gICAgICAgIHZhciB4O1xuICAgICAgICAvLyBJbml0aWFsaXplIHRvIHRoZSBpZGVudGl0eSBjdWJlXG4gICAgICAgIHRoaXMuY2VudGVyID0gWzAsIDEsIDIsIDMsIDQsIDVdO1xuICAgICAgICB0aGlzLmNwID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDddO1xuICAgICAgICB0aGlzLmNvID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBrLCByZXN1bHRzO1xuICAgICAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgICBmb3IgKHggPSBrID0gMDsgayA8PSA3OyB4ID0gKytrKSB7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2goMCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICB9KSgpO1xuICAgICAgICB0aGlzLmVwID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMV07XG4gICAgICAgIHJldHVybiB0aGlzLmVvID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBrLCByZXN1bHRzO1xuICAgICAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgICBmb3IgKHggPSBrID0gMDsgayA8PSAxMTsgeCA9ICsraykge1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKDApO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgfSkoKTtcbiAgICAgIH1cblxuICAgICAgdG9KU09OKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGNlbnRlcjogdGhpcy5jZW50ZXIsXG4gICAgICAgICAgY3A6IHRoaXMuY3AsXG4gICAgICAgICAgY286IHRoaXMuY28sXG4gICAgICAgICAgZXA6IHRoaXMuZXAsXG4gICAgICAgICAgZW86IHRoaXMuZW9cbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgYXNTdHJpbmcoKSB7XG4gICAgICAgIHZhciBjb3JuZXIsIGVkZ2UsIGksIGssIGwsIG0sIG4sIG8sIG9yaSwgcCwgcmVzdWx0O1xuICAgICAgICByZXN1bHQgPSBbXTtcbiAgICAgICAgZm9yIChpID0gayA9IDA7IGsgPD0gNTsgaSA9ICsraykge1xuICAgICAgICAgIHJlc3VsdFs5ICogaSArIDRdID0gY2VudGVyQ29sb3JbdGhpcy5jZW50ZXJbaV1dO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IGwgPSAwOyBsIDw9IDc7IGkgPSArK2wpIHtcbiAgICAgICAgICBjb3JuZXIgPSB0aGlzLmNwW2ldO1xuICAgICAgICAgIG9yaSA9IHRoaXMuY29baV07XG4gICAgICAgICAgZm9yIChuID0gbSA9IDA7IG0gPD0gMjsgbiA9ICsrbSkge1xuICAgICAgICAgICAgcmVzdWx0W2Nvcm5lckZhY2VsZXRbaV1bKG4gKyBvcmkpICUgM11dID0gY29ybmVyQ29sb3JbY29ybmVyXVtuXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gbyA9IDA7IG8gPD0gMTE7IGkgPSArK28pIHtcbiAgICAgICAgICBlZGdlID0gdGhpcy5lcFtpXTtcbiAgICAgICAgICBvcmkgPSB0aGlzLmVvW2ldO1xuICAgICAgICAgIGZvciAobiA9IHAgPSAwOyBwIDw9IDE7IG4gPSArK3ApIHtcbiAgICAgICAgICAgIHJlc3VsdFtlZGdlRmFjZWxldFtpXVsobiArIG9yaSkgJSAyXV0gPSBlZGdlQ29sb3JbZWRnZV1bbl07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQuam9pbignJyk7XG4gICAgICB9XG5cbiAgICAgIHN0YXRpYyBmcm9tU3RyaW5nKHN0cikge1xuICAgICAgICB2YXIgY29sMSwgY29sMiwgY3ViZSwgaSwgaiwgaywgbCwgbSwgbywgb3JpLCBwLCBxLCByLCByZWY7XG4gICAgICAgIGN1YmUgPSBuZXcgQ3ViZTtcbiAgICAgICAgZm9yIChpID0gayA9IDA7IGsgPD0gNTsgaSA9ICsraykge1xuICAgICAgICAgIGZvciAoaiA9IGwgPSAwOyBsIDw9IDU7IGogPSArK2wpIHtcbiAgICAgICAgICAgIGlmIChzdHJbOSAqIGkgKyA0XSA9PT0gY2VudGVyQ29sb3Jbal0pIHtcbiAgICAgICAgICAgICAgY3ViZS5jZW50ZXJbaV0gPSBqO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSBtID0gMDsgbSA8PSA3OyBpID0gKyttKSB7XG4gICAgICAgICAgZm9yIChvcmkgPSBvID0gMDsgbyA8PSAyOyBvcmkgPSArK28pIHtcbiAgICAgICAgICAgIGlmICgocmVmID0gc3RyW2Nvcm5lckZhY2VsZXRbaV1bb3JpXV0pID09PSAnVScgfHwgcmVmID09PSAnRCcpIHtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbDEgPSBzdHJbY29ybmVyRmFjZWxldFtpXVsob3JpICsgMSkgJSAzXV07XG4gICAgICAgICAgY29sMiA9IHN0cltjb3JuZXJGYWNlbGV0W2ldWyhvcmkgKyAyKSAlIDNdXTtcbiAgICAgICAgICBmb3IgKGogPSBwID0gMDsgcCA8PSA3OyBqID0gKytwKSB7XG4gICAgICAgICAgICBpZiAoY29sMSA9PT0gY29ybmVyQ29sb3Jbal1bMV0gJiYgY29sMiA9PT0gY29ybmVyQ29sb3Jbal1bMl0pIHtcbiAgICAgICAgICAgICAgY3ViZS5jcFtpXSA9IGo7XG4gICAgICAgICAgICAgIGN1YmUuY29baV0gPSBvcmkgJSAzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSBxID0gMDsgcSA8PSAxMTsgaSA9ICsrcSkge1xuICAgICAgICAgIGZvciAoaiA9IHIgPSAwOyByIDw9IDExOyBqID0gKytyKSB7XG4gICAgICAgICAgICBpZiAoc3RyW2VkZ2VGYWNlbGV0W2ldWzBdXSA9PT0gZWRnZUNvbG9yW2pdWzBdICYmIHN0cltlZGdlRmFjZWxldFtpXVsxXV0gPT09IGVkZ2VDb2xvcltqXVsxXSkge1xuICAgICAgICAgICAgICBjdWJlLmVwW2ldID0gajtcbiAgICAgICAgICAgICAgY3ViZS5lb1tpXSA9IDA7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0cltlZGdlRmFjZWxldFtpXVswXV0gPT09IGVkZ2VDb2xvcltqXVsxXSAmJiBzdHJbZWRnZUZhY2VsZXRbaV1bMV1dID09PSBlZGdlQ29sb3Jbal1bMF0pIHtcbiAgICAgICAgICAgICAgY3ViZS5lcFtpXSA9IGo7XG4gICAgICAgICAgICAgIGN1YmUuZW9baV0gPSAxO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGN1YmU7XG4gICAgICB9XG5cbiAgICAgIGNsb25lKCkge1xuICAgICAgICByZXR1cm4gbmV3IEN1YmUodGhpcy50b0pTT04oKSk7XG4gICAgICB9XG5cbiAgICAgIC8vIEEgY2xhc3MgbWV0aG9kIHJldHVybmluZyBhIG5ldyByYW5kb20gY3ViZVxuICAgICAgc3RhdGljIHJhbmRvbSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDdWJlKCkucmFuZG9taXplKCk7XG4gICAgICB9XG5cbiAgICAgIGlzU29sdmVkKCkge1xuICAgICAgICB2YXIgYywgY2VudCwgY2xvbmUsIGUsIGssIGwsIG07XG4gICAgICAgIGNsb25lID0gdGhpcy5jbG9uZSgpO1xuICAgICAgICBjbG9uZS5tb3ZlKGNsb25lLnVwcmlnaHQoKSk7XG4gICAgICAgIGZvciAoY2VudCA9IGsgPSAwOyBrIDw9IDU7IGNlbnQgPSArK2spIHtcbiAgICAgICAgICBpZiAoY2xvbmUuY2VudGVyW2NlbnRdICE9PSBjZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAoYyA9IGwgPSAwOyBsIDw9IDc7IGMgPSArK2wpIHtcbiAgICAgICAgICBpZiAoY2xvbmUuY3BbY10gIT09IGMpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGNsb25lLmNvW2NdICE9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAoZSA9IG0gPSAwOyBtIDw9IDExOyBlID0gKyttKSB7XG4gICAgICAgICAgaWYgKGNsb25lLmVwW2VdICE9PSBlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChjbG9uZS5lb1tlXSAhPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gTXVsdGlwbHkgdGhpcyBDdWJlIHdpdGggYW5vdGhlciBDdWJlLCByZXN0cmljdGVkIHRvIGNlbnRlcnMuXG4gICAgICBjZW50ZXJNdWx0aXBseShvdGhlcikge1xuICAgICAgICB2YXIgZnJvbSwgaywgdG87XG4gICAgICAgIGZvciAodG8gPSBrID0gMDsgayA8PSA1OyB0byA9ICsraykge1xuICAgICAgICAgIGZyb20gPSBvdGhlci5jZW50ZXJbdG9dO1xuICAgICAgICAgIHRoaXMubmV3Q2VudGVyW3RvXSA9IHRoaXMuY2VudGVyW2Zyb21dO1xuICAgICAgICB9XG4gICAgICAgIFt0aGlzLmNlbnRlciwgdGhpcy5uZXdDZW50ZXJdID0gW3RoaXMubmV3Q2VudGVyLCB0aGlzLmNlbnRlcl07XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICAvLyBNdWx0aXBseSB0aGlzIEN1YmUgd2l0aCBhbm90aGVyIEN1YmUsIHJlc3RyaWN0ZWQgdG8gY29ybmVycy5cbiAgICAgIGNvcm5lck11bHRpcGx5KG90aGVyKSB7XG4gICAgICAgIHZhciBmcm9tLCBrLCB0bztcbiAgICAgICAgZm9yICh0byA9IGsgPSAwOyBrIDw9IDc7IHRvID0gKytrKSB7XG4gICAgICAgICAgZnJvbSA9IG90aGVyLmNwW3RvXTtcbiAgICAgICAgICB0aGlzLm5ld0NwW3RvXSA9IHRoaXMuY3BbZnJvbV07XG4gICAgICAgICAgdGhpcy5uZXdDb1t0b10gPSAodGhpcy5jb1tmcm9tXSArIG90aGVyLmNvW3RvXSkgJSAzO1xuICAgICAgICB9XG4gICAgICAgIFt0aGlzLmNwLCB0aGlzLm5ld0NwXSA9IFt0aGlzLm5ld0NwLCB0aGlzLmNwXTtcbiAgICAgICAgW3RoaXMuY28sIHRoaXMubmV3Q29dID0gW3RoaXMubmV3Q28sIHRoaXMuY29dO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgLy8gTXVsdGlwbHkgdGhpcyBDdWJlIHdpdGggYW5vdGhlciBDdWJlLCByZXN0cmljdGVkIHRvIGVkZ2VzXG4gICAgICBlZGdlTXVsdGlwbHkob3RoZXIpIHtcbiAgICAgICAgdmFyIGZyb20sIGssIHRvO1xuICAgICAgICBmb3IgKHRvID0gayA9IDA7IGsgPD0gMTE7IHRvID0gKytrKSB7XG4gICAgICAgICAgZnJvbSA9IG90aGVyLmVwW3RvXTtcbiAgICAgICAgICB0aGlzLm5ld0VwW3RvXSA9IHRoaXMuZXBbZnJvbV07XG4gICAgICAgICAgdGhpcy5uZXdFb1t0b10gPSAodGhpcy5lb1tmcm9tXSArIG90aGVyLmVvW3RvXSkgJSAyO1xuICAgICAgICB9XG4gICAgICAgIFt0aGlzLmVwLCB0aGlzLm5ld0VwXSA9IFt0aGlzLm5ld0VwLCB0aGlzLmVwXTtcbiAgICAgICAgW3RoaXMuZW8sIHRoaXMubmV3RW9dID0gW3RoaXMubmV3RW8sIHRoaXMuZW9dO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgLy8gTXVsdGlwbHkgdGhpcyBjdWJlIHdpdGggYW5vdGhlciBDdWJlXG4gICAgICBtdWx0aXBseShvdGhlcikge1xuICAgICAgICB0aGlzLmNlbnRlck11bHRpcGx5KG90aGVyKTtcbiAgICAgICAgdGhpcy5jb3JuZXJNdWx0aXBseShvdGhlcik7XG4gICAgICAgIHRoaXMuZWRnZU11bHRpcGx5KG90aGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIG1vdmUoYXJnKSB7XG4gICAgICAgIHZhciBmYWNlLCBrLCBsLCBsZW4sIG1vdmUsIHBvd2VyLCByZWYsIHJlZjEsIHg7XG4gICAgICAgIHJlZiA9IHBhcnNlQWxnKGFyZyk7XG4gICAgICAgIGZvciAoayA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGsgPCBsZW47IGsrKykge1xuICAgICAgICAgIG1vdmUgPSByZWZba107XG4gICAgICAgICAgZmFjZSA9IG1vdmUgLyAzIHwgMDtcbiAgICAgICAgICBwb3dlciA9IG1vdmUgJSAzO1xuICAgICAgICAgIGZvciAoeCA9IGwgPSAwLCByZWYxID0gcG93ZXI7ICgwIDw9IHJlZjEgPyBsIDw9IHJlZjEgOiBsID49IHJlZjEpOyB4ID0gMCA8PSByZWYxID8gKytsIDogLS1sKSB7XG4gICAgICAgICAgICB0aGlzLm11bHRpcGx5KEN1YmUubW92ZXNbZmFjZV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgdXByaWdodCgpIHtcbiAgICAgICAgdmFyIGNsb25lLCBpLCBqLCBrLCBsLCByZXN1bHQ7XG4gICAgICAgIGNsb25lID0gdGhpcy5jbG9uZSgpO1xuICAgICAgICByZXN1bHQgPSBbXTtcbiAgICAgICAgZm9yIChpID0gayA9IDA7IGsgPD0gNTsgaSA9ICsraykge1xuICAgICAgICAgIGlmIChjbG9uZS5jZW50ZXJbaV0gPT09IEYpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKGkpIHtcbiAgICAgICAgICBjYXNlIEQ6XG4gICAgICAgICAgICByZXN1bHQucHVzaChcInhcIik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFU6XG4gICAgICAgICAgICByZXN1bHQucHVzaChcIngnXCIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBCOlxuICAgICAgICAgICAgcmVzdWx0LnB1c2goXCJ4MlwiKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgUjpcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFwieVwiKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgTDpcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFwieSdcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgICBjbG9uZS5tb3ZlKHJlc3VsdFswXSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChqID0gbCA9IDA7IGwgPD0gNTsgaiA9ICsrbCkge1xuICAgICAgICAgIGlmIChjbG9uZS5jZW50ZXJbal0gPT09IFUpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKGopIHtcbiAgICAgICAgICBjYXNlIEw6XG4gICAgICAgICAgICByZXN1bHQucHVzaChcInpcIik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFI6XG4gICAgICAgICAgICByZXN1bHQucHVzaChcInonXCIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBEOlxuICAgICAgICAgICAgcmVzdWx0LnB1c2goXCJ6MlwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0LmpvaW4oJyAnKTtcbiAgICAgIH1cblxuICAgICAgc3RhdGljIGludmVyc2UoYXJnKSB7XG4gICAgICAgIHZhciBmYWNlLCBrLCBsZW4sIG1vdmUsIHBvd2VyLCByZXN1bHQsIHN0cjtcbiAgICAgICAgcmVzdWx0ID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBrLCBsZW4sIHJlZiwgcmVzdWx0cztcbiAgICAgICAgICByZWYgPSBwYXJzZUFsZyhhcmcpO1xuICAgICAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgICBmb3IgKGsgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBrIDwgbGVuOyBrKyspIHtcbiAgICAgICAgICAgIG1vdmUgPSByZWZba107XG4gICAgICAgICAgICBmYWNlID0gbW92ZSAvIDMgfCAwO1xuICAgICAgICAgICAgcG93ZXIgPSBtb3ZlICUgMztcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChmYWNlICogMyArIC0ocG93ZXIgLSAxKSArIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgfSkoKTtcbiAgICAgICAgcmVzdWx0LnJldmVyc2UoKTtcbiAgICAgICAgaWYgKHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgc3RyID0gJyc7XG4gICAgICAgICAgZm9yIChrID0gMCwgbGVuID0gcmVzdWx0Lmxlbmd0aDsgayA8IGxlbjsgaysrKSB7XG4gICAgICAgICAgICBtb3ZlID0gcmVzdWx0W2tdO1xuICAgICAgICAgICAgZmFjZSA9IG1vdmUgLyAzIHwgMDtcbiAgICAgICAgICAgIHBvd2VyID0gbW92ZSAlIDM7XG4gICAgICAgICAgICBzdHIgKz0gZmFjZU5hbWVzW2ZhY2VdO1xuICAgICAgICAgICAgaWYgKHBvd2VyID09PSAxKSB7XG4gICAgICAgICAgICAgIHN0ciArPSAnMic7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBvd2VyID09PSAyKSB7XG4gICAgICAgICAgICAgIHN0ciArPSBcIidcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0ciArPSAnICc7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBzdHIuc3Vic3RyaW5nKDAsIHN0ci5sZW5ndGggLSAxKTtcbiAgICAgICAgfSBlbHNlIGlmIChhcmcubGVuZ3RoICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiByZXN1bHRbMF07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIH07XG5cbiAgICBDdWJlLnByb3RvdHlwZS5yYW5kb21pemUgPSAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJlUGVybXV0YXRpb25zVmFsaWQsIGdlbmVyYXRlVmFsaWRSYW5kb21PcmllbnRhdGlvbiwgZ2VuZXJhdGVWYWxpZFJhbmRvbVBlcm11dGF0aW9uLCBnZXROdW1Td2FwcywgaXNPcmllbnRhdGlvblZhbGlkLCByYW5kaW50LCByYW5kb21pemVPcmllbnRhdGlvbiwgcmVzdWx0LCBzaHVmZmxlO1xuICAgICAgcmFuZGludCA9IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XG4gICAgICAgIHJldHVybiBtaW4gKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpO1xuICAgICAgfTtcbiAgICAgIC8vIEZpc2hlci1ZYXRlcyBzaHVmZmxlIGFkYXB0ZWQgZnJvbSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yNDUwOTU0L2hvdy10by1yYW5kb21pemUtc2h1ZmZsZS1hLWphdmFzY3JpcHQtYXJyYXlcbiAgICAgIHNodWZmbGUgPSBmdW5jdGlvbihhcnJheSkge1xuICAgICAgICB2YXIgY3VycmVudEluZGV4LCByYW5kb21JbmRleCwgdGVtcG9yYXJ5VmFsdWU7XG4gICAgICAgIGN1cnJlbnRJbmRleCA9IGFycmF5Lmxlbmd0aDtcbiAgICAgICAgLy8gV2hpbGUgdGhlcmUgcmVtYWluIGVsZW1lbnRzIHRvIHNodWZmbGUuLi5cbiAgICAgICAgd2hpbGUgKGN1cnJlbnRJbmRleCAhPT0gMCkge1xuICAgICAgICAgIC8vIFBpY2sgYSByZW1haW5pbmcgZWxlbWVudC4uLlxuICAgICAgICAgIHJhbmRvbUluZGV4ID0gcmFuZGludCgwLCBjdXJyZW50SW5kZXggLSAxKTtcbiAgICAgICAgICBjdXJyZW50SW5kZXggLT0gMTtcbiAgICAgICAgICAvLyBBbmQgc3dhcCBpdCB3aXRoIHRoZSBjdXJyZW50IGVsZW1lbnQuXG4gICAgICAgICAgdGVtcG9yYXJ5VmFsdWUgPSBhcnJheVtjdXJyZW50SW5kZXhdO1xuICAgICAgICAgIFthcnJheVtjdXJyZW50SW5kZXhdLCBhcnJheVtyYW5kb21JbmRleF1dID0gW2FycmF5W3JhbmRvbUluZGV4XSwgYXJyYXlbY3VycmVudEluZGV4XV07XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBnZXROdW1Td2FwcyA9IGZ1bmN0aW9uKGFycikge1xuICAgICAgICB2YXIgY3VyLCBjeWNsZUxlbmd0aCwgaSwgaywgbnVtU3dhcHMsIHJlZiwgc2VlbiwgeDtcbiAgICAgICAgbnVtU3dhcHMgPSAwO1xuICAgICAgICBzZWVuID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBrLCByZWYsIHJlc3VsdHM7XG4gICAgICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgICAgIGZvciAoeCA9IGsgPSAwLCByZWYgPSBhcnIubGVuZ3RoIC0gMTsgKDAgPD0gcmVmID8gayA8PSByZWYgOiBrID49IHJlZik7IHggPSAwIDw9IHJlZiA/ICsrayA6IC0taykge1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIH0pKCk7XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgLy8gV2UgY29tcHV0ZSB0aGUgY3ljbGUgZGVjb21wb3NpdGlvblxuICAgICAgICAgIGN1ciA9IC0xO1xuICAgICAgICAgIGZvciAoaSA9IGsgPSAwLCByZWYgPSBhcnIubGVuZ3RoIC0gMTsgKDAgPD0gcmVmID8gayA8PSByZWYgOiBrID49IHJlZik7IGkgPSAwIDw9IHJlZiA/ICsrayA6IC0taykge1xuICAgICAgICAgICAgaWYgKCFzZWVuW2ldKSB7XG4gICAgICAgICAgICAgIGN1ciA9IGk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoY3VyID09PSAtMSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGN5Y2xlTGVuZ3RoID0gMDtcbiAgICAgICAgICB3aGlsZSAoIXNlZW5bY3VyXSkge1xuICAgICAgICAgICAgc2VlbltjdXJdID0gdHJ1ZTtcbiAgICAgICAgICAgIGN5Y2xlTGVuZ3RoKys7XG4gICAgICAgICAgICBjdXIgPSBhcnJbY3VyXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gQSBjeWNsZSBpcyBlcXVpdmFsZW50IHRvIGN5Y2xlTGVuZ3RoICsgMSBzd2Fwc1xuICAgICAgICAgIG51bVN3YXBzICs9IGN5Y2xlTGVuZ3RoICsgMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVtU3dhcHM7XG4gICAgICB9O1xuICAgICAgYXJlUGVybXV0YXRpb25zVmFsaWQgPSBmdW5jdGlvbihjcCwgZXApIHtcbiAgICAgICAgdmFyIG51bVN3YXBzO1xuICAgICAgICBudW1Td2FwcyA9IGdldE51bVN3YXBzKGVwKSArIGdldE51bVN3YXBzKGNwKTtcbiAgICAgICAgcmV0dXJuIG51bVN3YXBzICUgMiA9PT0gMDtcbiAgICAgIH07XG4gICAgICBnZW5lcmF0ZVZhbGlkUmFuZG9tUGVybXV0YXRpb24gPSBmdW5jdGlvbihjcCwgZXApIHtcbiAgICAgICAgLy8gRWFjaCBzaHVmZmxlIG9ubHkgdGFrZXMgYXJvdW5kIDEyIG9wZXJhdGlvbnMgYW5kIHRoZXJlJ3MgYSA1MCVcbiAgICAgICAgLy8gY2hhbmNlIG9mIGEgdmFsaWQgcGVybXV0YXRpb24gc28gaXQnbGwgZmluaXNoIGluIHZlcnkgZ29vZCB0aW1lXG4gICAgICAgIHNodWZmbGUoZXApO1xuICAgICAgICBzaHVmZmxlKGNwKTtcbiAgICAgICAgd2hpbGUgKCFhcmVQZXJtdXRhdGlvbnNWYWxpZChjcCwgZXApKSB7XG4gICAgICAgICAgc2h1ZmZsZShlcCk7XG4gICAgICAgICAgc2h1ZmZsZShjcCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByYW5kb21pemVPcmllbnRhdGlvbiA9IGZ1bmN0aW9uKGFyciwgbnVtT3JpZW50YXRpb25zKSB7XG4gICAgICAgIHZhciBpLCBrLCBvcmksIHJlZjtcbiAgICAgICAgb3JpID0gMDtcbiAgICAgICAgZm9yIChpID0gayA9IDAsIHJlZiA9IGFyci5sZW5ndGggLSAxOyAoMCA8PSByZWYgPyBrIDw9IHJlZiA6IGsgPj0gcmVmKTsgaSA9IDAgPD0gcmVmID8gKytrIDogLS1rKSB7XG4gICAgICAgICAgb3JpICs9IChhcnJbaV0gPSByYW5kaW50KDAsIG51bU9yaWVudGF0aW9ucyAtIDEpKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGlzT3JpZW50YXRpb25WYWxpZCA9IGZ1bmN0aW9uKGFyciwgbnVtT3JpZW50YXRpb25zKSB7XG4gICAgICAgIHJldHVybiBhcnIucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICByZXR1cm4gYSArIGI7XG4gICAgICAgIH0pICUgbnVtT3JpZW50YXRpb25zID09PSAwO1xuICAgICAgfTtcbiAgICAgIGdlbmVyYXRlVmFsaWRSYW5kb21PcmllbnRhdGlvbiA9IGZ1bmN0aW9uKGNvLCBlbykge1xuICAgICAgICAvLyBUaGVyZSBpcyBhIDEvMiBhbmQgMS8zIHByb2JhYmx5IHJlc3BlY3RpdmVseSBvZiBlYWNoIG9mIHRoZXNlXG4gICAgICAgIC8vIHN1Y2NlZWRpbmcgc28gdGhlIHByb2JhYmlsaXR5IG9mIHRoZW0gcnVubmluZyAxMCB0aW1lcyBiZWZvcmVcbiAgICAgICAgLy8gc3VjY2VzcyBpcyBhbHJlYWR5IG9ubHkgMSUgYW5kIG9ubHkgZ2V0cyBleHBvbmVudGlhbGx5IGxvd2VyXG4gICAgICAgIC8vIGFuZCBlYWNoIGdlbmVyYXRpb24gaXMgb25seSBpbiB0aGUgMTBzIG9mIG9wZXJhdGlvbnMgd2hpY2ggaXMgbm90aGluZ1xuICAgICAgICByYW5kb21pemVPcmllbnRhdGlvbihjbywgMyk7XG4gICAgICAgIHdoaWxlICghaXNPcmllbnRhdGlvblZhbGlkKGNvLCAzKSkge1xuICAgICAgICAgIHJhbmRvbWl6ZU9yaWVudGF0aW9uKGNvLCAzKTtcbiAgICAgICAgfVxuICAgICAgICByYW5kb21pemVPcmllbnRhdGlvbihlbywgMik7XG4gICAgICAgIHdoaWxlICghaXNPcmllbnRhdGlvblZhbGlkKGVvLCAyKSkge1xuICAgICAgICAgIHJhbmRvbWl6ZU9yaWVudGF0aW9uKGVvLCAyKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJlc3VsdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBnZW5lcmF0ZVZhbGlkUmFuZG9tUGVybXV0YXRpb24odGhpcy5jcCwgdGhpcy5lcCk7XG4gICAgICAgIGdlbmVyYXRlVmFsaWRSYW5kb21PcmllbnRhdGlvbih0aGlzLmNvLCB0aGlzLmVvKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9KSgpO1xuXG4gICAgQ3ViZS5tb3ZlcyA9IFtcbiAgICAgIHtcbiAgICAgICAgLy8gVVxuICAgICAgICBjZW50ZXI6IFswLCAxLCAyLCAzLCA0LCA1XSxcbiAgICAgICAgY3A6IFtVQlIsXG4gICAgICBVUkYsXG4gICAgICBVRkwsXG4gICAgICBVTEIsXG4gICAgICBERlIsXG4gICAgICBETEYsXG4gICAgICBEQkwsXG4gICAgICBEUkJdLFxuICAgICAgICBjbzogWzAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwXSxcbiAgICAgICAgZXA6IFtVQixcbiAgICAgIFVSLFxuICAgICAgVUYsXG4gICAgICBVTCxcbiAgICAgIERSLFxuICAgICAgREYsXG4gICAgICBETCxcbiAgICAgIERCLFxuICAgICAgRlIsXG4gICAgICBGTCxcbiAgICAgIEJMLFxuICAgICAgQlJdLFxuICAgICAgICBlbzogWzAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMF1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIC8vIFJcbiAgICAgICAgY2VudGVyOiBbMCwgMSwgMiwgMywgNCwgNV0sXG4gICAgICAgIGNwOiBbREZSLFxuICAgICAgVUZMLFxuICAgICAgVUxCLFxuICAgICAgVVJGLFxuICAgICAgRFJCLFxuICAgICAgRExGLFxuICAgICAgREJMLFxuICAgICAgVUJSXSxcbiAgICAgICAgY286IFsyLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMl0sXG4gICAgICAgIGVwOiBbRlIsXG4gICAgICBVRixcbiAgICAgIFVMLFxuICAgICAgVUIsXG4gICAgICBCUixcbiAgICAgIERGLFxuICAgICAgREwsXG4gICAgICBEQixcbiAgICAgIERSLFxuICAgICAgRkwsXG4gICAgICBCTCxcbiAgICAgIFVSXSxcbiAgICAgICAgZW86IFswLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAvLyBGXG4gICAgICAgIGNlbnRlcjogWzAsIDEsIDIsIDMsIDQsIDVdLFxuICAgICAgICBjcDogW1VGTCxcbiAgICAgIERMRixcbiAgICAgIFVMQixcbiAgICAgIFVCUixcbiAgICAgIFVSRixcbiAgICAgIERGUixcbiAgICAgIERCTCxcbiAgICAgIERSQl0sXG4gICAgICAgIGNvOiBbMSxcbiAgICAgIDIsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMCxcbiAgICAgIDBdLFxuICAgICAgICBlcDogW1VSLFxuICAgICAgRkwsXG4gICAgICBVTCxcbiAgICAgIFVCLFxuICAgICAgRFIsXG4gICAgICBGUixcbiAgICAgIERMLFxuICAgICAgREIsXG4gICAgICBVRixcbiAgICAgIERGLFxuICAgICAgQkwsXG4gICAgICBCUl0sXG4gICAgICAgIGVvOiBbMCxcbiAgICAgIDEsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAxLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDAsXG4gICAgICAwXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgLy8gRFxuICAgICAgICBjZW50ZXI6IFswLCAxLCAyLCAzLCA0LCA1XSxcbiAgICAgICAgY3A6IFtVUkYsXG4gICAgICBVRkwsXG4gICAgICBVTEIsXG4gICAgICBVQlIsXG4gICAgICBETEYsXG4gICAgICBEQkwsXG4gICAgICBEUkIsXG4gICAgICBERlJdLFxuICAgICAgICBjbzogWzAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwXSxcbiAgICAgICAgZXA6IFtVUixcbiAgICAgIFVGLFxuICAgICAgVUwsXG4gICAgICBVQixcbiAgICAgIERGLFxuICAgICAgREwsXG4gICAgICBEQixcbiAgICAgIERSLFxuICAgICAgRlIsXG4gICAgICBGTCxcbiAgICAgIEJMLFxuICAgICAgQlJdLFxuICAgICAgICBlbzogWzAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMF1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIC8vIExcbiAgICAgICAgY2VudGVyOiBbMCwgMSwgMiwgMywgNCwgNV0sXG4gICAgICAgIGNwOiBbVVJGLFxuICAgICAgVUxCLFxuICAgICAgREJMLFxuICAgICAgVUJSLFxuICAgICAgREZSLFxuICAgICAgVUZMLFxuICAgICAgRExGLFxuICAgICAgRFJCXSxcbiAgICAgICAgY286IFswLFxuICAgICAgMSxcbiAgICAgIDIsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDIsXG4gICAgICAxLFxuICAgICAgMF0sXG4gICAgICAgIGVwOiBbVVIsXG4gICAgICBVRixcbiAgICAgIEJMLFxuICAgICAgVUIsXG4gICAgICBEUixcbiAgICAgIERGLFxuICAgICAgRkwsXG4gICAgICBEQixcbiAgICAgIEZSLFxuICAgICAgVUwsXG4gICAgICBETCxcbiAgICAgIEJSXSxcbiAgICAgICAgZW86IFswLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAvLyBCXG4gICAgICAgIGNlbnRlcjogWzAsIDEsIDIsIDMsIDQsIDVdLFxuICAgICAgICBjcDogW1VSRixcbiAgICAgIFVGTCxcbiAgICAgIFVCUixcbiAgICAgIERSQixcbiAgICAgIERGUixcbiAgICAgIERMRixcbiAgICAgIFVMQixcbiAgICAgIERCTF0sXG4gICAgICAgIGNvOiBbMCxcbiAgICAgIDAsXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMixcbiAgICAgIDFdLFxuICAgICAgICBlcDogW1VSLFxuICAgICAgVUYsXG4gICAgICBVTCxcbiAgICAgIEJSLFxuICAgICAgRFIsXG4gICAgICBERixcbiAgICAgIERMLFxuICAgICAgQkwsXG4gICAgICBGUixcbiAgICAgIEZMLFxuICAgICAgVUIsXG4gICAgICBEQl0sXG4gICAgICAgIGVvOiBbMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMSxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDEsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDEsXG4gICAgICAxXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgLy8gRVxuICAgICAgICBjZW50ZXI6IFtVLFxuICAgICAgRixcbiAgICAgIEwsXG4gICAgICBELFxuICAgICAgQixcbiAgICAgIFJdLFxuICAgICAgICBjcDogW1VSRixcbiAgICAgIFVGTCxcbiAgICAgIFVMQixcbiAgICAgIFVCUixcbiAgICAgIERGUixcbiAgICAgIERMRixcbiAgICAgIERCTCxcbiAgICAgIERSQl0sXG4gICAgICAgIGNvOiBbMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDBdLFxuICAgICAgICBlcDogW1VSLFxuICAgICAgVUYsXG4gICAgICBVTCxcbiAgICAgIFVCLFxuICAgICAgRFIsXG4gICAgICBERixcbiAgICAgIERMLFxuICAgICAgREIsXG4gICAgICBGTCxcbiAgICAgIEJMLFxuICAgICAgQlIsXG4gICAgICBGUl0sXG4gICAgICAgIGVvOiBbMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDEsXG4gICAgICAxXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgLy8gTVxuICAgICAgICBjZW50ZXI6IFtCLFxuICAgICAgUixcbiAgICAgIFUsXG4gICAgICBGLFxuICAgICAgTCxcbiAgICAgIERdLFxuICAgICAgICBjcDogW1VSRixcbiAgICAgIFVGTCxcbiAgICAgIFVMQixcbiAgICAgIFVCUixcbiAgICAgIERGUixcbiAgICAgIERMRixcbiAgICAgIERCTCxcbiAgICAgIERSQl0sXG4gICAgICAgIGNvOiBbMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDBdLFxuICAgICAgICBlcDogW1VSLFxuICAgICAgVUIsXG4gICAgICBVTCxcbiAgICAgIERCLFxuICAgICAgRFIsXG4gICAgICBVRixcbiAgICAgIERMLFxuICAgICAgREYsXG4gICAgICBGUixcbiAgICAgIEZMLFxuICAgICAgQkwsXG4gICAgICBCUl0sXG4gICAgICAgIGVvOiBbMCxcbiAgICAgIDEsXG4gICAgICAwLFxuICAgICAgMSxcbiAgICAgIDAsXG4gICAgICAxLFxuICAgICAgMCxcbiAgICAgIDEsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgLy8gU1xuICAgICAgICBjZW50ZXI6IFtMLFxuICAgICAgVSxcbiAgICAgIEYsXG4gICAgICBSLFxuICAgICAgRCxcbiAgICAgIEJdLFxuICAgICAgICBjcDogW1VSRixcbiAgICAgIFVGTCxcbiAgICAgIFVMQixcbiAgICAgIFVCUixcbiAgICAgIERGUixcbiAgICAgIERMRixcbiAgICAgIERCTCxcbiAgICAgIERSQl0sXG4gICAgICAgIGNvOiBbMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDBdLFxuICAgICAgICBlcDogW1VMLFxuICAgICAgVUYsXG4gICAgICBETCxcbiAgICAgIFVCLFxuICAgICAgVVIsXG4gICAgICBERixcbiAgICAgIERSLFxuICAgICAgREIsXG4gICAgICBGUixcbiAgICAgIEZMLFxuICAgICAgQkwsXG4gICAgICBCUl0sXG4gICAgICAgIGVvOiBbMSxcbiAgICAgIDAsXG4gICAgICAxLFxuICAgICAgMCxcbiAgICAgIDEsXG4gICAgICAwLFxuICAgICAgMSxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwXVxuICAgICAgfVxuICAgIF07XG5cbiAgICBmYWNlTnVtcyA9IHtcbiAgICAgIFU6IDAsXG4gICAgICBSOiAxLFxuICAgICAgRjogMixcbiAgICAgIEQ6IDMsXG4gICAgICBMOiA0LFxuICAgICAgQjogNSxcbiAgICAgIEU6IDYsXG4gICAgICBNOiA3LFxuICAgICAgUzogOCxcbiAgICAgIHg6IDksXG4gICAgICB5OiAxMCxcbiAgICAgIHo6IDExLFxuICAgICAgdTogMTIsXG4gICAgICByOiAxMyxcbiAgICAgIGY6IDE0LFxuICAgICAgZDogMTUsXG4gICAgICBsOiAxNixcbiAgICAgIGI6IDE3XG4gICAgfTtcblxuICAgIGZhY2VOYW1lcyA9IHtcbiAgICAgIDA6ICdVJyxcbiAgICAgIDE6ICdSJyxcbiAgICAgIDI6ICdGJyxcbiAgICAgIDM6ICdEJyxcbiAgICAgIDQ6ICdMJyxcbiAgICAgIDU6ICdCJyxcbiAgICAgIDY6ICdFJyxcbiAgICAgIDc6ICdNJyxcbiAgICAgIDg6ICdTJyxcbiAgICAgIDk6ICd4JyxcbiAgICAgIDEwOiAneScsXG4gICAgICAxMTogJ3onLFxuICAgICAgMTI6ICd1JyxcbiAgICAgIDEzOiAncicsXG4gICAgICAxNDogJ2YnLFxuICAgICAgMTU6ICdkJyxcbiAgICAgIDE2OiAnbCcsXG4gICAgICAxNzogJ2InXG4gICAgfTtcblxuICAgIHBhcnNlQWxnID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgICB2YXIgaywgbGVuLCBtb3ZlLCBwYXJ0LCBwb3dlciwgcmVmLCByZXN1bHRzO1xuICAgICAgaWYgKHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJlZiA9IGFyZy5zcGxpdCgvXFxzKy8pO1xuICAgICAgICAvLyBTdHJpbmdcbiAgICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgICBmb3IgKGsgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBrIDwgbGVuOyBrKyspIHtcbiAgICAgICAgICBwYXJ0ID0gcmVmW2tdO1xuICAgICAgICAgIGlmIChwYXJ0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gRmlyc3QgYW5kIGxhc3QgY2FuIGJlIGVtcHR5XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHBhcnQubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIG1vdmU6ICR7cGFydH1gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbW92ZSA9IGZhY2VOdW1zW3BhcnRbMF1dO1xuICAgICAgICAgIGlmIChtb3ZlID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBtb3ZlOiAke3BhcnR9YCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChwYXJ0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgcG93ZXIgPSAwO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAocGFydFsxXSA9PT0gJzInKSB7XG4gICAgICAgICAgICAgIHBvd2VyID0gMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFydFsxXSA9PT0gXCInXCIpIHtcbiAgICAgICAgICAgICAgcG93ZXIgPSAyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIG1vdmU6ICR7cGFydH1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzdWx0cy5wdXNoKG1vdmUgKiAzICsgcG93ZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgfSBlbHNlIGlmIChhcmcubGVuZ3RoICE9IG51bGwpIHtcbiAgICAgICAgLy8gQWxyZWFkeSBhbiBhcnJheVxuICAgICAgICByZXR1cm4gYXJnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQSBzaW5nbGUgbW92ZVxuICAgICAgICByZXR1cm4gW2FyZ107XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIHhcbiAgICBDdWJlLm1vdmVzLnB1c2gobmV3IEN1YmUoKS5tb3ZlKFwiUiBNJyBMJ1wiKS50b0pTT04oKSk7XG5cbiAgICAvLyB5XG4gICAgQ3ViZS5tb3Zlcy5wdXNoKG5ldyBDdWJlKCkubW92ZShcIlUgRScgRCdcIikudG9KU09OKCkpO1xuXG4gICAgLy8gelxuICAgIEN1YmUubW92ZXMucHVzaChuZXcgQ3ViZSgpLm1vdmUoXCJGIFMgQidcIikudG9KU09OKCkpO1xuXG4gICAgLy8gdVxuICAgIEN1YmUubW92ZXMucHVzaChuZXcgQ3ViZSgpLm1vdmUoXCJVIEUnXCIpLnRvSlNPTigpKTtcblxuICAgIC8vIHJcbiAgICBDdWJlLm1vdmVzLnB1c2gobmV3IEN1YmUoKS5tb3ZlKFwiUiBNJ1wiKS50b0pTT04oKSk7XG5cbiAgICAvLyBmXG4gICAgQ3ViZS5tb3Zlcy5wdXNoKG5ldyBDdWJlKCkubW92ZShcIkYgU1wiKS50b0pTT04oKSk7XG5cbiAgICAvLyBkXG4gICAgQ3ViZS5tb3Zlcy5wdXNoKG5ldyBDdWJlKCkubW92ZShcIkQgRVwiKS50b0pTT04oKSk7XG5cbiAgICAvLyBsXG4gICAgQ3ViZS5tb3Zlcy5wdXNoKG5ldyBDdWJlKCkubW92ZShcIkwgTVwiKS50b0pTT04oKSk7XG5cbiAgICAvLyBiXG4gICAgQ3ViZS5tb3Zlcy5wdXNoKG5ldyBDdWJlKCkubW92ZShcIkIgUydcIikudG9KU09OKCkpO1xuXG4gICAgcmV0dXJuIEN1YmU7XG5cbiAgfSkuY2FsbCh0aGlzKTtcblxuICAvLyMgR2xvYmFsc1xuICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBtb2R1bGUgIT09IG51bGwpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IEN1YmU7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5DdWJlID0gQ3ViZTtcbiAgfVxuXG59KS5jYWxsKHRoaXMpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICB2YXIgQiwgQkwsIEJSLCBDbmssIEN1YmUsIEQsIERCLCBEQkwsIERGLCBERlIsIERMLCBETEYsIERSLCBEUkIsIEYsIEZMLCBGUiwgSW5jbHVkZSwgTCwgTl9GTElQLCBOX0ZSdG9CUiwgTl9QQVJJVFksIE5fU0xJQ0UxLCBOX1NMSUNFMiwgTl9UV0lTVCwgTl9VQnRvREYsIE5fVVJGdG9ETEYsIE5fVVJ0b0RGLCBOX1VSdG9VTCwgUiwgVSwgVUIsIFVCUiwgVUYsIFVGTCwgVUwsIFVMQiwgVVIsIFVSRiwgYWxsTW92ZXMxLCBhbGxNb3ZlczIsIGNvbXB1dGVNb3ZlVGFibGUsIGNvbXB1dGVQcnVuaW5nVGFibGUsIGZhY2VOYW1lcywgZmFjZU51bXMsIGZhY3RvcmlhbCwga2V5LCBtYXgsIG1lcmdlVVJ0b0RGLCBtb3ZlVGFibGVQYXJhbXMsIG5leHRNb3ZlczEsIG5leHRNb3ZlczIsIHBlcm11dGF0aW9uSW5kZXgsIHBydW5pbmcsIHBydW5pbmdUYWJsZVBhcmFtcywgcm90YXRlTGVmdCwgcm90YXRlUmlnaHQsIHZhbHVlLFxuICAgIGluZGV4T2YgPSBbXS5pbmRleE9mO1xuXG4gIEN1YmUgPSB0aGlzLkN1YmUgfHwgcmVxdWlyZSgnLi9jdWJlJyk7XG5cbiAgLy8gQ2VudGVyc1xuICBbVSwgUiwgRiwgRCwgTCwgQl0gPSBbMCwgMSwgMiwgMywgNCwgNV07XG5cbiAgLy8gQ29ybmVyc1xuICBbVVJGLCBVRkwsIFVMQiwgVUJSLCBERlIsIERMRiwgREJMLCBEUkJdID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDddO1xuXG4gIC8vIEVkZ2VzXG4gIFtVUiwgVUYsIFVMLCBVQiwgRFIsIERGLCBETCwgREIsIEZSLCBGTCwgQkwsIEJSXSA9IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTFdO1xuXG4gIC8vIyBIZWxwZXJzXG5cbiAgLy8gbiBjaG9vc2UgaywgaS5lLiB0aGUgYmlub21pYWwgY29lZmZpZWNpZW50XG4gIENuayA9IGZ1bmN0aW9uKG4sIGspIHtcbiAgICB2YXIgaSwgaiwgcztcbiAgICBpZiAobiA8IGspIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBpZiAoayA+IG4gLyAyKSB7XG4gICAgICBrID0gbiAtIGs7XG4gICAgfVxuICAgIHMgPSAxO1xuICAgIGkgPSBuO1xuICAgIGogPSAxO1xuICAgIHdoaWxlIChpICE9PSBuIC0gaykge1xuICAgICAgcyAqPSBpO1xuICAgICAgcyAvPSBqO1xuICAgICAgaS0tO1xuICAgICAgaisrO1xuICAgIH1cbiAgICByZXR1cm4gcztcbiAgfTtcblxuICAvLyBuIVxuICBmYWN0b3JpYWwgPSBmdW5jdGlvbihuKSB7XG4gICAgdmFyIGYsIGksIG0sIHJlZjtcbiAgICBmID0gMTtcbiAgICBmb3IgKGkgPSBtID0gMiwgcmVmID0gbjsgKDIgPD0gcmVmID8gbSA8PSByZWYgOiBtID49IHJlZik7IGkgPSAyIDw9IHJlZiA/ICsrbSA6IC0tbSkge1xuICAgICAgZiAqPSBpO1xuICAgIH1cbiAgICByZXR1cm4gZjtcbiAgfTtcblxuICAvLyBNYXhpbXVtIG9mIHR3byB2YWx1ZXNcbiAgbWF4ID0gZnVuY3Rpb24oYSwgYikge1xuICAgIGlmIChhID4gYikge1xuICAgICAgcmV0dXJuIGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBiO1xuICAgIH1cbiAgfTtcblxuICAvLyBSb3RhdGUgZWxlbWVudHMgYmV0d2VlbiBsIGFuZCByIGxlZnQgYnkgb25lIHBsYWNlXG4gIHJvdGF0ZUxlZnQgPSBmdW5jdGlvbihhcnJheSwgbCwgcikge1xuICAgIHZhciBpLCBtLCByZWYsIHJlZjEsIHRtcDtcbiAgICB0bXAgPSBhcnJheVtsXTtcbiAgICBmb3IgKGkgPSBtID0gcmVmID0gbCwgcmVmMSA9IHIgLSAxOyAocmVmIDw9IHJlZjEgPyBtIDw9IHJlZjEgOiBtID49IHJlZjEpOyBpID0gcmVmIDw9IHJlZjEgPyArK20gOiAtLW0pIHtcbiAgICAgIGFycmF5W2ldID0gYXJyYXlbaSArIDFdO1xuICAgIH1cbiAgICByZXR1cm4gYXJyYXlbcl0gPSB0bXA7XG4gIH07XG5cbiAgLy8gUm90YXRlIGVsZW1lbnRzIGJldHdlZW4gbCBhbmQgciByaWdodCBieSBvbmUgcGxhY2VcbiAgcm90YXRlUmlnaHQgPSBmdW5jdGlvbihhcnJheSwgbCwgcikge1xuICAgIHZhciBpLCBtLCByZWYsIHJlZjEsIHRtcDtcbiAgICB0bXAgPSBhcnJheVtyXTtcbiAgICBmb3IgKGkgPSBtID0gcmVmID0gciwgcmVmMSA9IGwgKyAxOyAocmVmIDw9IHJlZjEgPyBtIDw9IHJlZjEgOiBtID49IHJlZjEpOyBpID0gcmVmIDw9IHJlZjEgPyArK20gOiAtLW0pIHtcbiAgICAgIGFycmF5W2ldID0gYXJyYXlbaSAtIDFdO1xuICAgIH1cbiAgICByZXR1cm4gYXJyYXlbbF0gPSB0bXA7XG4gIH07XG5cbiAgLy8gR2VuZXJhdGUgYSBmdW5jdGlvbiB0aGF0IGNvbXB1dGVzIHBlcm11dGF0aW9uIGluZGljZXMuXG5cbiAgLy8gVGhlIHBlcm11dGF0aW9uIGluZGV4IGFjdHVhbGx5IGVuY29kZXMgdHdvIGluZGljZXM6IENvbWJpbmF0aW9uLFxuICAvLyBpLmUuIHBvc2l0aW9ucyBvZiB0aGUgY3ViaWVzIHN0YXJ0Li5lbmQgKEEpIGFuZCB0aGVpciByZXNwZWN0aXZlXG4gIC8vIHBlcm11dGF0aW9uIChCKS4gVGhlIG1heGltdW0gdmFsdWUgZm9yIEIgaXNcblxuICAvLyAgIG1heEIgPSAoZW5kIC0gc3RhcnQgKyAxKSFcblxuICAvLyBhbmQgdGhlIGluZGV4IGlzIEEgKiBtYXhCICsgQlxuICBwZXJtdXRhdGlvbkluZGV4ID0gZnVuY3Rpb24oY29udGV4dCwgc3RhcnQsIGVuZCwgZnJvbUVuZCA9IGZhbHNlKSB7XG4gICAgdmFyIGksIG1heEFsbCwgbWF4QiwgbWF4T3VyLCBvdXIsIHBlcm1OYW1lO1xuICAgIG1heE91ciA9IGVuZCAtIHN0YXJ0O1xuICAgIG1heEIgPSBmYWN0b3JpYWwobWF4T3VyICsgMSk7XG4gICAgaWYgKGNvbnRleHQgPT09ICdjb3JuZXJzJykge1xuICAgICAgbWF4QWxsID0gNztcbiAgICAgIHBlcm1OYW1lID0gJ2NwJztcbiAgICB9IGVsc2Uge1xuICAgICAgbWF4QWxsID0gMTE7XG4gICAgICBwZXJtTmFtZSA9ICdlcCc7XG4gICAgfVxuICAgIG91ciA9IChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBtLCByZWYsIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSBtID0gMCwgcmVmID0gbWF4T3VyOyAoMCA8PSByZWYgPyBtIDw9IHJlZiA6IG0gPj0gcmVmKTsgaSA9IDAgPD0gcmVmID8gKyttIDogLS1tKSB7XG4gICAgICAgIHJlc3VsdHMucHVzaCgwKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0pKCk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICB2YXIgYSwgYiwgYywgaiwgaywgbSwgbywgcCwgcGVybSwgcSwgcmVmLCByZWYxLCByZWYxMCwgcmVmMiwgcmVmMywgcmVmNCwgcmVmNSwgcmVmNiwgcmVmNywgcmVmOCwgcmVmOSwgdCwgdSwgdywgeCwgeSwgejtcbiAgICAgIGlmIChpbmRleCAhPSBudWxsKSB7XG4gICAgICAgIGZvciAoaSA9IG0gPSAwLCByZWYgPSBtYXhPdXI7ICgwIDw9IHJlZiA/IG0gPD0gcmVmIDogbSA+PSByZWYpOyBpID0gMCA8PSByZWYgPyArK20gOiAtLW0pIHtcbiAgICAgICAgICAvLyBSZXNldCBvdXIgdG8gW3N0YXJ0Li5lbmRdXG4gICAgICAgICAgb3VyW2ldID0gaSArIHN0YXJ0O1xuICAgICAgICB9XG4gICAgICAgIGIgPSBpbmRleCAlIG1heEI7IC8vIHBlcm11dGF0aW9uXG4gICAgICAgIGEgPSBpbmRleCAvIG1heEIgfCAwOyAvLyBjb21iaW5hdGlvblxuICAgICAgICBcbiAgICAgICAgLy8gSW52YWxpZGF0ZSBhbGwgZWRnZXNcbiAgICAgICAgcGVybSA9IHRoaXNbcGVybU5hbWVdO1xuICAgICAgICBmb3IgKGkgPSBvID0gMCwgcmVmMSA9IG1heEFsbDsgKDAgPD0gcmVmMSA/IG8gPD0gcmVmMSA6IG8gPj0gcmVmMSk7IGkgPSAwIDw9IHJlZjEgPyArK28gOiAtLW8pIHtcbiAgICAgICAgICBwZXJtW2ldID0gLTE7XG4gICAgICAgIH1cbi8vIEdlbmVyYXRlIHBlcm11dGF0aW9uIGZyb20gaW5kZXggYlxuICAgICAgICBmb3IgKGogPSBwID0gMSwgcmVmMiA9IG1heE91cjsgKDEgPD0gcmVmMiA/IHAgPD0gcmVmMiA6IHAgPj0gcmVmMik7IGogPSAxIDw9IHJlZjIgPyArK3AgOiAtLXApIHtcbiAgICAgICAgICBrID0gYiAlIChqICsgMSk7XG4gICAgICAgICAgYiA9IGIgLyAoaiArIDEpIHwgMDtcbiAgICAgICAgICAvLyBUT0RPOiBJbXBsZW1lbnQgcm90YXRlUmlnaHRCeShvdXIsIDAsIGosIGspXG4gICAgICAgICAgd2hpbGUgKGsgPiAwKSB7XG4gICAgICAgICAgICByb3RhdGVSaWdodChvdXIsIDAsIGopO1xuICAgICAgICAgICAgay0tO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBHZW5lcmF0ZSBjb21iaW5hdGlvbiBhbmQgc2V0IG91ciBlZGdlc1xuICAgICAgICB4ID0gbWF4T3VyO1xuICAgICAgICBpZiAoZnJvbUVuZCkge1xuICAgICAgICAgIGZvciAoaiA9IHEgPSAwLCByZWYzID0gbWF4QWxsOyAoMCA8PSByZWYzID8gcSA8PSByZWYzIDogcSA+PSByZWYzKTsgaiA9IDAgPD0gcmVmMyA/ICsrcSA6IC0tcSkge1xuICAgICAgICAgICAgYyA9IENuayhtYXhBbGwgLSBqLCB4ICsgMSk7XG4gICAgICAgICAgICBpZiAoYSAtIGMgPj0gMCkge1xuICAgICAgICAgICAgICBwZXJtW2pdID0gb3VyW21heE91ciAtIHhdO1xuICAgICAgICAgICAgICBhIC09IGM7XG4gICAgICAgICAgICAgIHgtLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9yIChqID0gdCA9IHJlZjQgPSBtYXhBbGw7IChyZWY0IDw9IDAgPyB0IDw9IDAgOiB0ID49IDApOyBqID0gcmVmNCA8PSAwID8gKyt0IDogLS10KSB7XG4gICAgICAgICAgICBjID0gQ25rKGosIHggKyAxKTtcbiAgICAgICAgICAgIGlmIChhIC0gYyA+PSAwKSB7XG4gICAgICAgICAgICAgIHBlcm1bal0gPSBvdXJbeF07XG4gICAgICAgICAgICAgIGEgLT0gYztcbiAgICAgICAgICAgICAgeC0tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBlcm0gPSB0aGlzW3Blcm1OYW1lXTtcbiAgICAgICAgZm9yIChpID0gdSA9IDAsIHJlZjUgPSBtYXhPdXI7ICgwIDw9IHJlZjUgPyB1IDw9IHJlZjUgOiB1ID49IHJlZjUpOyBpID0gMCA8PSByZWY1ID8gKyt1IDogLS11KSB7XG4gICAgICAgICAgb3VyW2ldID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgYSA9IGIgPSB4ID0gMDtcbiAgICAgICAgLy8gQ29tcHV0ZSB0aGUgaW5kZXggYSA8ICgobWF4QWxsICsgMSkgY2hvb3NlIChtYXhPdXIgKyAxKSkgYW5kXG4gICAgICAgIC8vIHRoZSBwZXJtdXRhdGlvblxuICAgICAgICBpZiAoZnJvbUVuZCkge1xuICAgICAgICAgIGZvciAoaiA9IHcgPSByZWY2ID0gbWF4QWxsOyAocmVmNiA8PSAwID8gdyA8PSAwIDogdyA+PSAwKTsgaiA9IHJlZjYgPD0gMCA/ICsrdyA6IC0tdykge1xuICAgICAgICAgICAgaWYgKChzdGFydCA8PSAocmVmNyA9IHBlcm1bal0pICYmIHJlZjcgPD0gZW5kKSkge1xuICAgICAgICAgICAgICBhICs9IENuayhtYXhBbGwgLSBqLCB4ICsgMSk7XG4gICAgICAgICAgICAgIG91clttYXhPdXIgLSB4XSA9IHBlcm1bal07XG4gICAgICAgICAgICAgIHgrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9yIChqID0geSA9IDAsIHJlZjggPSBtYXhBbGw7ICgwIDw9IHJlZjggPyB5IDw9IHJlZjggOiB5ID49IHJlZjgpOyBqID0gMCA8PSByZWY4ID8gKyt5IDogLS15KSB7XG4gICAgICAgICAgICBpZiAoKHN0YXJ0IDw9IChyZWY5ID0gcGVybVtqXSkgJiYgcmVmOSA8PSBlbmQpKSB7XG4gICAgICAgICAgICAgIGEgKz0gQ25rKGosIHggKyAxKTtcbiAgICAgICAgICAgICAgb3VyW3hdID0gcGVybVtqXTtcbiAgICAgICAgICAgICAgeCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuLy8gQ29tcHV0ZSB0aGUgaW5kZXggYiA8IChtYXhPdXIgKyAxKSEgZm9yIHRoZSBwZXJtdXRhdGlvblxuICAgICAgICBmb3IgKGogPSB6ID0gcmVmMTAgPSBtYXhPdXI7IChyZWYxMCA8PSAwID8geiA8PSAwIDogeiA+PSAwKTsgaiA9IHJlZjEwIDw9IDAgPyArK3ogOiAtLXopIHtcbiAgICAgICAgICBrID0gMDtcbiAgICAgICAgICB3aGlsZSAob3VyW2pdICE9PSBzdGFydCArIGopIHtcbiAgICAgICAgICAgIHJvdGF0ZUxlZnQob3VyLCAwLCBqKTtcbiAgICAgICAgICAgIGsrKztcbiAgICAgICAgICB9XG4gICAgICAgICAgYiA9IChqICsgMSkgKiBiICsgaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYSAqIG1heEIgKyBiO1xuICAgICAgfVxuICAgIH07XG4gIH07XG5cbiAgSW5jbHVkZSA9IHtcbiAgICAvLyBUaGUgdHdpc3Qgb2YgdGhlIDggY29ybmVycywgMCA8PSB0d2lzdCA8IDNeNy4gVGhlIG9yaWVudGF0aW9uIG9mXG4gICAgLy8gdGhlIERSQiBjb3JuZXIgaXMgZnVsbHkgZGV0ZXJtaW5lZCBieSB0aGUgb3JpZW50YXRpb24gb2YgdGhlIG90aGVyXG4gICAgLy8gY29ybmVycy5cbiAgICB0d2lzdDogZnVuY3Rpb24odHdpc3QpIHtcbiAgICAgIHZhciBpLCBtLCBvLCBvcmksIHBhcml0eSwgdjtcbiAgICAgIGlmICh0d2lzdCAhPSBudWxsKSB7XG4gICAgICAgIHBhcml0eSA9IDA7XG4gICAgICAgIGZvciAoaSA9IG0gPSA2OyBtID49IDA7IGkgPSAtLW0pIHtcbiAgICAgICAgICBvcmkgPSB0d2lzdCAlIDM7XG4gICAgICAgICAgdHdpc3QgPSAodHdpc3QgLyAzKSB8IDA7XG4gICAgICAgICAgdGhpcy5jb1tpXSA9IG9yaTtcbiAgICAgICAgICBwYXJpdHkgKz0gb3JpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29bN10gPSAoMyAtIHBhcml0eSAlIDMpICUgMztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2ID0gMDtcbiAgICAgICAgZm9yIChpID0gbyA9IDA7IG8gPD0gNjsgaSA9ICsrbykge1xuICAgICAgICAgIHYgPSAzICogdiArIHRoaXMuY29baV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHY7XG4gICAgICB9XG4gICAgfSxcbiAgICAvLyBUaGUgZmxpcCBvZiB0aGUgMTIgZWRnZXMsIDAgPD0gZmxpcCA8IDJeMTEuIFRoZSBvcmllbnRhdGlvbiBvZiB0aGVcbiAgICAvLyBCUiBlZGdlIGlzIGZ1bGx5IGRldGVybWluZWQgYnkgdGhlIG9yaWVudGF0aW9uIG9mIHRoZSBvdGhlciBlZGdlcy5cbiAgICBmbGlwOiBmdW5jdGlvbihmbGlwKSB7XG4gICAgICB2YXIgaSwgbSwgbywgb3JpLCBwYXJpdHksIHY7XG4gICAgICBpZiAoZmxpcCAhPSBudWxsKSB7XG4gICAgICAgIHBhcml0eSA9IDA7XG4gICAgICAgIGZvciAoaSA9IG0gPSAxMDsgbSA+PSAwOyBpID0gLS1tKSB7XG4gICAgICAgICAgb3JpID0gZmxpcCAlIDI7XG4gICAgICAgICAgZmxpcCA9IGZsaXAgLyAyIHwgMDtcbiAgICAgICAgICB0aGlzLmVvW2ldID0gb3JpO1xuICAgICAgICAgIHBhcml0eSArPSBvcmk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lb1sxMV0gPSAoMiAtIHBhcml0eSAlIDIpICUgMjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2ID0gMDtcbiAgICAgICAgZm9yIChpID0gbyA9IDA7IG8gPD0gMTA7IGkgPSArK28pIHtcbiAgICAgICAgICB2ID0gMiAqIHYgKyB0aGlzLmVvW2ldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2O1xuICAgICAgfVxuICAgIH0sXG4gICAgLy8gUGFyaXR5IG9mIHRoZSBjb3JuZXIgcGVybXV0YXRpb25cbiAgICBjb3JuZXJQYXJpdHk6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGksIGosIG0sIG8sIHJlZiwgcmVmMSwgcmVmMiwgcmVmMywgcztcbiAgICAgIHMgPSAwO1xuICAgICAgZm9yIChpID0gbSA9IHJlZiA9IERSQiwgcmVmMSA9IFVSRiArIDE7IChyZWYgPD0gcmVmMSA/IG0gPD0gcmVmMSA6IG0gPj0gcmVmMSk7IGkgPSByZWYgPD0gcmVmMSA/ICsrbSA6IC0tbSkge1xuICAgICAgICBmb3IgKGogPSBvID0gcmVmMiA9IGkgLSAxLCByZWYzID0gVVJGOyAocmVmMiA8PSByZWYzID8gbyA8PSByZWYzIDogbyA+PSByZWYzKTsgaiA9IHJlZjIgPD0gcmVmMyA/ICsrbyA6IC0tbykge1xuICAgICAgICAgIGlmICh0aGlzLmNwW2pdID4gdGhpcy5jcFtpXSkge1xuICAgICAgICAgICAgcysrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHMgJSAyO1xuICAgIH0sXG4gICAgLy8gUGFyaXR5IG9mIHRoZSBlZGdlcyBwZXJtdXRhdGlvbi4gUGFyaXR5IG9mIGNvcm5lcnMgYW5kIGVkZ2VzIGFyZVxuICAgIC8vIHRoZSBzYW1lIGlmIHRoZSBjdWJlIGlzIHNvbHZhYmxlLlxuICAgIGVkZ2VQYXJpdHk6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGksIGosIG0sIG8sIHJlZiwgcmVmMSwgcmVmMiwgcmVmMywgcztcbiAgICAgIHMgPSAwO1xuICAgICAgZm9yIChpID0gbSA9IHJlZiA9IEJSLCByZWYxID0gVVIgKyAxOyAocmVmIDw9IHJlZjEgPyBtIDw9IHJlZjEgOiBtID49IHJlZjEpOyBpID0gcmVmIDw9IHJlZjEgPyArK20gOiAtLW0pIHtcbiAgICAgICAgZm9yIChqID0gbyA9IHJlZjIgPSBpIC0gMSwgcmVmMyA9IFVSOyAocmVmMiA8PSByZWYzID8gbyA8PSByZWYzIDogbyA+PSByZWYzKTsgaiA9IHJlZjIgPD0gcmVmMyA/ICsrbyA6IC0tbykge1xuICAgICAgICAgIGlmICh0aGlzLmVwW2pdID4gdGhpcy5lcFtpXSkge1xuICAgICAgICAgICAgcysrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHMgJSAyO1xuICAgIH0sXG4gICAgLy8gUGVybXV0YXRpb24gb2YgdGhlIHNpeCBjb3JuZXJzIFVSRiwgVUZMLCBVTEIsIFVCUiwgREZSLCBETEZcbiAgICBVUkZ0b0RMRjogcGVybXV0YXRpb25JbmRleCgnY29ybmVycycsIFVSRiwgRExGKSxcbiAgICAvLyBQZXJtdXRhdGlvbiBvZiB0aGUgdGhyZWUgZWRnZXMgVVIsIFVGLCBVTFxuICAgIFVSdG9VTDogcGVybXV0YXRpb25JbmRleCgnZWRnZXMnLCBVUiwgVUwpLFxuICAgIC8vIFBlcm11dGF0aW9uIG9mIHRoZSB0aHJlZSBlZGdlcyBVQiwgRFIsIERGXG4gICAgVUJ0b0RGOiBwZXJtdXRhdGlvbkluZGV4KCdlZGdlcycsIFVCLCBERiksXG4gICAgLy8gUGVybXV0YXRpb24gb2YgdGhlIHNpeCBlZGdlcyBVUiwgVUYsIFVMLCBVQiwgRFIsIERGXG4gICAgVVJ0b0RGOiBwZXJtdXRhdGlvbkluZGV4KCdlZGdlcycsIFVSLCBERiksXG4gICAgLy8gUGVybXV0YXRpb24gb2YgdGhlIGVxdWF0b3Igc2xpY2UgZWRnZXMgRlIsIEZMLCBCTCBhbmQgQlJcbiAgICBGUnRvQlI6IHBlcm11dGF0aW9uSW5kZXgoJ2VkZ2VzJywgRlIsIEJSLCB0cnVlKVxuICB9O1xuXG4gIGZvciAoa2V5IGluIEluY2x1ZGUpIHtcbiAgICB2YWx1ZSA9IEluY2x1ZGVba2V5XTtcbiAgICBDdWJlLnByb3RvdHlwZVtrZXldID0gdmFsdWU7XG4gIH1cblxuICBjb21wdXRlTW92ZVRhYmxlID0gZnVuY3Rpb24oY29udGV4dCwgY29vcmQsIHNpemUpIHtcbiAgICB2YXIgYXBwbHksIGN1YmUsIGksIGlubmVyLCBqLCBrLCBtLCBtb3ZlLCBvLCBwLCByZWYsIHJlc3VsdHM7XG4gICAgLy8gTG9vcCB0aHJvdWdoIGFsbCB2YWxpZCB2YWx1ZXMgZm9yIHRoZSBjb29yZGluYXRlLCBzZXR0aW5nIGN1YmUnc1xuICAgIC8vIHN0YXRlIGluIGVhY2ggaXRlcmF0aW9uLiBUaGVuIGFwcGx5IGVhY2ggb2YgdGhlIDE4IG1vdmVzIHRvIHRoZVxuICAgIC8vIGN1YmUsIGFuZCBjb21wdXRlIHRoZSByZXN1bHRpbmcgY29vcmRpbmF0ZS5cbiAgICBhcHBseSA9IGNvbnRleHQgPT09ICdjb3JuZXJzJyA/ICdjb3JuZXJNdWx0aXBseScgOiAnZWRnZU11bHRpcGx5JztcbiAgICBjdWJlID0gbmV3IEN1YmU7XG4gICAgcmVzdWx0cyA9IFtdO1xuICAgIGZvciAoaSA9IG0gPSAwLCByZWYgPSBzaXplIC0gMTsgKDAgPD0gcmVmID8gbSA8PSByZWYgOiBtID49IHJlZik7IGkgPSAwIDw9IHJlZiA/ICsrbSA6IC0tbSkge1xuICAgICAgY3ViZVtjb29yZF0oaSk7XG4gICAgICBpbm5lciA9IFtdO1xuICAgICAgZm9yIChqID0gbyA9IDA7IG8gPD0gNTsgaiA9ICsrbykge1xuICAgICAgICBtb3ZlID0gQ3ViZS5tb3Zlc1tqXTtcbiAgICAgICAgZm9yIChrID0gcCA9IDA7IHAgPD0gMjsgayA9ICsrcCkge1xuICAgICAgICAgIGN1YmVbYXBwbHldKG1vdmUpO1xuICAgICAgICAgIGlubmVyLnB1c2goY3ViZVtjb29yZF0oKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNHRoIGZhY2UgdHVybiByZXN0b3JlcyB0aGUgY3ViZVxuICAgICAgICBjdWJlW2FwcGx5XShtb3ZlKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdHMucHVzaChpbm5lcik7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9O1xuXG4gIC8vIEJlY2F1c2Ugd2Ugb25seSBoYXZlIHRoZSBwaGFzZSAyIFVSdG9ERiBjb29yZGluYXRlcywgd2UgbmVlZCB0b1xuICAvLyBtZXJnZSB0aGUgVVJ0b1VMIGFuZCBVQnRvREYgY29vcmRpbmF0ZXMgdG8gVVJ0b0RGIGluIHRoZSBiZWdpbm5pbmdcbiAgLy8gb2YgcGhhc2UgMi5cbiAgbWVyZ2VVUnRvREYgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGEsIGI7XG4gICAgYSA9IG5ldyBDdWJlO1xuICAgIGIgPSBuZXcgQ3ViZTtcbiAgICByZXR1cm4gZnVuY3Rpb24oVVJ0b1VMLCBVQnRvREYpIHtcbiAgICAgIHZhciBpLCBtO1xuICAgICAgLy8gQ29sbGlzaW9ucyBjYW4gYmUgZm91bmQgYmVjYXVzZSB1bnNldCBhcmUgc2V0IHRvIC0xXG4gICAgICBhLlVSdG9VTChVUnRvVUwpO1xuICAgICAgYi5VQnRvREYoVUJ0b0RGKTtcbiAgICAgIGZvciAoaSA9IG0gPSAwOyBtIDw9IDc7IGkgPSArK20pIHtcbiAgICAgICAgaWYgKGEuZXBbaV0gIT09IC0xKSB7XG4gICAgICAgICAgaWYgKGIuZXBbaV0gIT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7IC8vIGNvbGxpc2lvblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBiLmVwW2ldID0gYS5lcFtpXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBiLlVSdG9ERigpO1xuICAgIH07XG4gIH0pKCk7XG5cbiAgTl9UV0lTVCA9IDIxODc7IC8vIDNeNyBjb3JuZXIgb3JpZW50YXRpb25zXG5cbiAgTl9GTElQID0gMjA0ODsgLy8gMl4xMSBwb3NzaWJsZSBlZGdlIGZsaXBzXG5cbiAgTl9QQVJJVFkgPSAyOyAvLyAyIHBvc3NpYmxlIHBhcml0aWVzXG5cbiAgTl9GUnRvQlIgPSAxMTg4MDsgLy8gMTIhLygxMi00KSEgcGVybXV0YXRpb25zIG9mIEZSLi5CUiBlZGdlc1xuXG4gIE5fU0xJQ0UxID0gNDk1OyAvLyAoMTIgY2hvb3NlIDQpIHBvc3NpYmxlIHBvc2l0aW9ucyBvZiBGUi4uQlIgZWRnZXNcblxuICBOX1NMSUNFMiA9IDI0OyAvLyA0ISBwZXJtdXRhdGlvbnMgb2YgRlIuLkJSIGVkZ2VzIGluIHBoYXNlIDJcblxuICBOX1VSRnRvRExGID0gMjAxNjA7IC8vIDghLyg4LTYpISBwZXJtdXRhdGlvbnMgb2YgVVJGLi5ETEYgY29ybmVyc1xuXG4gIFxuICAvLyBUaGUgVVJ0b0RGIG1vdmUgdGFibGUgaXMgb25seSBjb21wdXRlZCBmb3IgcGhhc2UgMiBiZWNhdXNlIHRoZSBmdWxsXG4gIC8vIHRhYmxlIHdvdWxkIGhhdmUgPjY1MDAwMCBlbnRyaWVzXG4gIE5fVVJ0b0RGID0gMjAxNjA7IC8vIDghLyg4LTYpISBwZXJtdXRhdGlvbiBvZiBVUi4uREYgZWRnZXMgaW4gcGhhc2UgMlxuXG4gIE5fVVJ0b1VMID0gMTMyMDsgLy8gMTIhLygxMi0zKSEgcGVybXV0YXRpb25zIG9mIFVSLi5VTCBlZGdlc1xuXG4gIE5fVUJ0b0RGID0gMTMyMDsgLy8gMTIhLygxMi0zKSEgcGVybXV0YXRpb25zIG9mIFVCLi5ERiBlZGdlc1xuXG4gIFxuICAvLyBUaGUgbW92ZSB0YWJsZSBmb3IgcGFyaXR5IGlzIHNvIHNtYWxsIHRoYXQgaXQncyBpbmNsdWRlZCBoZXJlXG4gIEN1YmUubW92ZVRhYmxlcyA9IHtcbiAgICBwYXJpdHk6IFtbMSwgMCwgMSwgMSwgMCwgMSwgMSwgMCwgMSwgMSwgMCwgMSwgMSwgMCwgMSwgMSwgMCwgMV0sIFswLCAxLCAwLCAwLCAxLCAwLCAwLCAxLCAwLCAwLCAxLCAwLCAwLCAxLCAwLCAwLCAxLCAwXV0sXG4gICAgdHdpc3Q6IG51bGwsXG4gICAgZmxpcDogbnVsbCxcbiAgICBGUnRvQlI6IG51bGwsXG4gICAgVVJGdG9ETEY6IG51bGwsXG4gICAgVVJ0b0RGOiBudWxsLFxuICAgIFVSdG9VTDogbnVsbCxcbiAgICBVQnRvREY6IG51bGwsXG4gICAgbWVyZ2VVUnRvREY6IG51bGxcbiAgfTtcblxuICAvLyBPdGhlciBtb3ZlIHRhYmxlcyBhcmUgY29tcHV0ZWQgb24gdGhlIGZseVxuICBtb3ZlVGFibGVQYXJhbXMgPSB7XG4gICAgLy8gbmFtZTogW3Njb3BlLCBzaXplXVxuICAgIHR3aXN0OiBbJ2Nvcm5lcnMnLCBOX1RXSVNUXSxcbiAgICBmbGlwOiBbJ2VkZ2VzJywgTl9GTElQXSxcbiAgICBGUnRvQlI6IFsnZWRnZXMnLCBOX0ZSdG9CUl0sXG4gICAgVVJGdG9ETEY6IFsnY29ybmVycycsIE5fVVJGdG9ETEZdLFxuICAgIFVSdG9ERjogWydlZGdlcycsIE5fVVJ0b0RGXSxcbiAgICBVUnRvVUw6IFsnZWRnZXMnLCBOX1VSdG9VTF0sXG4gICAgVUJ0b0RGOiBbJ2VkZ2VzJywgTl9VQnRvREZdLFxuICAgIG1lcmdlVVJ0b0RGOiBbXVxuICB9O1xuXG4gIEN1YmUuY29tcHV0ZU1vdmVUYWJsZXMgPSBmdW5jdGlvbiguLi50YWJsZXMpIHtcbiAgICB2YXIgbGVuLCBtLCBuYW1lLCBzY29wZSwgc2l6ZSwgdGFibGVOYW1lO1xuICAgIGlmICh0YWJsZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0YWJsZXMgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZXN1bHRzO1xuICAgICAgICByZXN1bHRzID0gW107XG4gICAgICAgIGZvciAobmFtZSBpbiBtb3ZlVGFibGVQYXJhbXMpIHtcbiAgICAgICAgICByZXN1bHRzLnB1c2gobmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICB9KSgpO1xuICAgIH1cbiAgICBmb3IgKG0gPSAwLCBsZW4gPSB0YWJsZXMubGVuZ3RoOyBtIDwgbGVuOyBtKyspIHtcbiAgICAgIHRhYmxlTmFtZSA9IHRhYmxlc1ttXTtcbiAgICAgIGlmICh0aGlzLm1vdmVUYWJsZXNbdGFibGVOYW1lXSAhPT0gbnVsbCkge1xuICAgICAgICAvLyBBbHJlYWR5IGNvbXB1dGVkXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHRhYmxlTmFtZSA9PT0gJ21lcmdlVVJ0b0RGJykge1xuICAgICAgICB0aGlzLm1vdmVUYWJsZXMubWVyZ2VVUnRvREYgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIFVCdG9ERiwgVVJ0b1VMLCBvLCByZXN1bHRzO1xuICAgICAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgICBmb3IgKFVSdG9VTCA9IG8gPSAwOyBvIDw9IDMzNTsgVVJ0b1VMID0gKytvKSB7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2goKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB2YXIgcCwgcmVzdWx0czE7XG4gICAgICAgICAgICAgIHJlc3VsdHMxID0gW107XG4gICAgICAgICAgICAgIGZvciAoVUJ0b0RGID0gcCA9IDA7IHAgPD0gMzM1OyBVQnRvREYgPSArK3ApIHtcbiAgICAgICAgICAgICAgICByZXN1bHRzMS5wdXNoKG1lcmdlVVJ0b0RGKFVSdG9VTCwgVUJ0b0RGKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHMxO1xuICAgICAgICAgICAgfSkoKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICB9KSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgW3Njb3BlLCBzaXplXSA9IG1vdmVUYWJsZVBhcmFtc1t0YWJsZU5hbWVdO1xuICAgICAgICB0aGlzLm1vdmVUYWJsZXNbdGFibGVOYW1lXSA9IGNvbXB1dGVNb3ZlVGFibGUoc2NvcGUsIHRhYmxlTmFtZSwgc2l6ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8vIFBoYXNlIDE6IEFsbCBtb3ZlcyBhcmUgdmFsaWRcbiAgYWxsTW92ZXMxID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTIsIDEzLCAxNCwgMTUsIDE2LCAxN107XG5cbiAgLy8gVGhlIGxpc3Qgb2YgbmV4dCB2YWxpZCBwaGFzZSAxIG1vdmVzIHdoZW4gdGhlIGdpdmVuIGZhY2Ugd2FzIHR1cm5lZFxuICAvLyBpbiB0aGUgbGFzdCBtb3ZlXG4gIG5leHRNb3ZlczEgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGZhY2UsIGxhc3RGYWNlLCBtLCBuZXh0LCBvLCBwLCBwb3dlciwgcmVzdWx0cztcbiAgICByZXN1bHRzID0gW107XG4gICAgZm9yIChsYXN0RmFjZSA9IG0gPSAwOyBtIDw9IDU7IGxhc3RGYWNlID0gKyttKSB7XG4gICAgICBuZXh0ID0gW107XG4vLyBEb24ndCBhbGxvdyBjb21tdXRpbmcgbW92ZXMsIGUuZy4gVSBVJy4gQWxzbyBtYWtlIHN1cmUgdGhhdFxuLy8gb3Bwb3NpdGUgZmFjZXMgYXJlIGFsd2F5cyBtb3ZlZCBpbiB0aGUgc2FtZSBvcmRlciwgaS5lLiBhbGxvd1xuLy8gVSBEIGJ1dCBubyBEIFUuIFRoaXMgYXZvaWRzIHNlcXVlbmNlcyBsaWtlIFUgRCBVJy5cbiAgICAgIGZvciAoZmFjZSA9IG8gPSAwOyBvIDw9IDU7IGZhY2UgPSArK28pIHtcbiAgICAgICAgaWYgKGZhY2UgIT09IGxhc3RGYWNlICYmIGZhY2UgIT09IGxhc3RGYWNlIC0gMykge1xuLy8gc2luZ2xlLCBkb3VibGUgb3IgaW52ZXJzZSBtb3ZlXG4gICAgICAgICAgZm9yIChwb3dlciA9IHAgPSAwOyBwIDw9IDI7IHBvd2VyID0gKytwKSB7XG4gICAgICAgICAgICBuZXh0LnB1c2goZmFjZSAqIDMgKyBwb3dlcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXN1bHRzLnB1c2gobmV4dCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9KSgpO1xuXG4gIC8vIFBoYXNlIDI6IERvdWJsZSBtb3ZlcyBvZiBhbGwgZmFjZXMgcGx1cyBxdWFydGVyIG1vdmVzIG9mIFUgYW5kIERcbiAgYWxsTW92ZXMyID0gWzAsIDEsIDIsIDQsIDcsIDksIDEwLCAxMSwgMTMsIDE2XTtcblxuICBuZXh0TW92ZXMyID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciBmYWNlLCBsYXN0RmFjZSwgbGVuLCBtLCBuZXh0LCBvLCBwLCBwb3dlciwgcG93ZXJzLCByZXN1bHRzO1xuICAgIHJlc3VsdHMgPSBbXTtcbiAgICBmb3IgKGxhc3RGYWNlID0gbSA9IDA7IG0gPD0gNTsgbGFzdEZhY2UgPSArK20pIHtcbiAgICAgIG5leHQgPSBbXTtcbiAgICAgIGZvciAoZmFjZSA9IG8gPSAwOyBvIDw9IDU7IGZhY2UgPSArK28pIHtcbiAgICAgICAgaWYgKCEoZmFjZSAhPT0gbGFzdEZhY2UgJiYgZmFjZSAhPT0gbGFzdEZhY2UgLSAzKSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFsbG93IGFsbCBtb3ZlcyBvZiBVIGFuZCBEIGFuZCBkb3VibGUgbW92ZXMgb2Ygb3RoZXJzXG4gICAgICAgIHBvd2VycyA9IGZhY2UgPT09IDAgfHwgZmFjZSA9PT0gMyA/IFswLCAxLCAyXSA6IFsxXTtcbiAgICAgICAgZm9yIChwID0gMCwgbGVuID0gcG93ZXJzLmxlbmd0aDsgcCA8IGxlbjsgcCsrKSB7XG4gICAgICAgICAgcG93ZXIgPSBwb3dlcnNbcF07XG4gICAgICAgICAgbmV4dC5wdXNoKGZhY2UgKiAzICsgcG93ZXIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXN1bHRzLnB1c2gobmV4dCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9KSgpO1xuXG4gIC8vIDggdmFsdWVzIGFyZSBlbmNvZGVkIGluIG9uZSBudW1iZXJcbiAgcHJ1bmluZyA9IGZ1bmN0aW9uKHRhYmxlLCBpbmRleCwgdmFsdWUpIHtcbiAgICB2YXIgcG9zLCBzaGlmdCwgc2xvdDtcbiAgICBwb3MgPSBpbmRleCAlIDg7XG4gICAgc2xvdCA9IGluZGV4ID4+IDM7XG4gICAgc2hpZnQgPSBwb3MgPDwgMjtcbiAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgLy8gU2V0XG4gICAgICB0YWJsZVtzbG90XSAmPSB+KDB4RiA8PCBzaGlmdCk7XG4gICAgICB0YWJsZVtzbG90XSB8PSB2YWx1ZSA8PCBzaGlmdDtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gR2V0XG4gICAgICByZXR1cm4gKHRhYmxlW3Nsb3RdICYgKDB4RiA8PCBzaGlmdCkpID4+PiBzaGlmdDtcbiAgICB9XG4gIH07XG5cbiAgY29tcHV0ZVBydW5pbmdUYWJsZSA9IGZ1bmN0aW9uKHBoYXNlLCBzaXplLCBjdXJyZW50Q29vcmRzLCBuZXh0SW5kZXgpIHtcbiAgICB2YXIgY3VycmVudCwgZGVwdGgsIGRvbmUsIGluZGV4LCBsZW4sIG0sIG1vdmUsIG1vdmVzLCBuZXh0LCBvLCByZWYsIHRhYmxlLCB4O1xuICAgIC8vIEluaXRpYWxpemUgYWxsIHZhbHVlcyB0byAweEZcbiAgICB0YWJsZSA9IChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBtLCByZWYsIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKHggPSBtID0gMCwgcmVmID0gTWF0aC5jZWlsKHNpemUgLyA4KSAtIDE7ICgwIDw9IHJlZiA/IG0gPD0gcmVmIDogbSA+PSByZWYpOyB4ID0gMCA8PSByZWYgPyArK20gOiAtLW0pIHtcbiAgICAgICAgcmVzdWx0cy5wdXNoKDB4RkZGRkZGRkYpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSkoKTtcbiAgICBpZiAocGhhc2UgPT09IDEpIHtcbiAgICAgIG1vdmVzID0gYWxsTW92ZXMxO1xuICAgIH0gZWxzZSB7XG4gICAgICBtb3ZlcyA9IGFsbE1vdmVzMjtcbiAgICB9XG4gICAgZGVwdGggPSAwO1xuICAgIHBydW5pbmcodGFibGUsIDAsIGRlcHRoKTtcbiAgICBkb25lID0gMTtcbiAgICAvLyBJbiBlYWNoIGl0ZXJhdGlvbiwgdGFrZSBlYWNoIHN0YXRlIGZvdW5kIGluIHRoZSBwcmV2aW91cyBkZXB0aCBhbmRcbiAgICAvLyBjb21wdXRlIHRoZSBuZXh0IHN0YXRlLiBTdG9wIHdoZW4gYWxsIHN0YXRlcyBoYXZlIGJlZW4gYXNzaWduZWQgYVxuICAgIC8vIGRlcHRoLlxuICAgIHdoaWxlIChkb25lICE9PSBzaXplKSB7XG4gICAgICBmb3IgKGluZGV4ID0gbSA9IDAsIHJlZiA9IHNpemUgLSAxOyAoMCA8PSByZWYgPyBtIDw9IHJlZiA6IG0gPj0gcmVmKTsgaW5kZXggPSAwIDw9IHJlZiA/ICsrbSA6IC0tbSkge1xuICAgICAgICBpZiAoIShwcnVuaW5nKHRhYmxlLCBpbmRleCkgPT09IGRlcHRoKSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Q29vcmRzKGluZGV4KTtcbiAgICAgICAgZm9yIChvID0gMCwgbGVuID0gbW92ZXMubGVuZ3RoOyBvIDwgbGVuOyBvKyspIHtcbiAgICAgICAgICBtb3ZlID0gbW92ZXNbb107XG4gICAgICAgICAgbmV4dCA9IG5leHRJbmRleChjdXJyZW50LCBtb3ZlKTtcbiAgICAgICAgICBpZiAocHJ1bmluZyh0YWJsZSwgbmV4dCkgPT09IDB4Rikge1xuICAgICAgICAgICAgcHJ1bmluZyh0YWJsZSwgbmV4dCwgZGVwdGggKyAxKTtcbiAgICAgICAgICAgIGRvbmUrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGRlcHRoKys7XG4gICAgfVxuICAgIHJldHVybiB0YWJsZTtcbiAgfTtcblxuICBDdWJlLnBydW5pbmdUYWJsZXMgPSB7XG4gICAgc2xpY2VUd2lzdDogbnVsbCxcbiAgICBzbGljZUZsaXA6IG51bGwsXG4gICAgc2xpY2VVUkZ0b0RMRlBhcml0eTogbnVsbCxcbiAgICBzbGljZVVSdG9ERlBhcml0eTogbnVsbFxuICB9O1xuXG4gIHBydW5pbmdUYWJsZVBhcmFtcyA9IHtcbiAgICAvLyBuYW1lOiBbcGhhc2UsIHNpemUsIGN1cnJlbnRDb29yZHMsIG5leHRJbmRleF1cbiAgICBzbGljZVR3aXN0OiBbXG4gICAgICAxLFxuICAgICAgTl9TTElDRTEgKiBOX1RXSVNULFxuICAgICAgZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIFtpbmRleCAlIE5fU0xJQ0UxLFxuICAgICAgaW5kZXggLyBOX1NMSUNFMSB8IDBdO1xuICAgICAgfSxcbiAgICAgIGZ1bmN0aW9uKGN1cnJlbnQsXG4gICAgICBtb3ZlKSB7XG4gICAgICAgIHZhciBuZXdTbGljZSxcbiAgICAgIG5ld1R3aXN0LFxuICAgICAgc2xpY2UsXG4gICAgICB0d2lzdDtcbiAgICAgICAgW3NsaWNlLFxuICAgICAgdHdpc3RdID0gY3VycmVudDtcbiAgICAgICAgbmV3U2xpY2UgPSBDdWJlLm1vdmVUYWJsZXMuRlJ0b0JSW3NsaWNlICogMjRdW21vdmVdIC8gMjQgfCAwO1xuICAgICAgICBuZXdUd2lzdCA9IEN1YmUubW92ZVRhYmxlcy50d2lzdFt0d2lzdF1bbW92ZV07XG4gICAgICAgIHJldHVybiBuZXdUd2lzdCAqIE5fU0xJQ0UxICsgbmV3U2xpY2U7XG4gICAgICB9XG4gICAgXSxcbiAgICBzbGljZUZsaXA6IFtcbiAgICAgIDEsXG4gICAgICBOX1NMSUNFMSAqIE5fRkxJUCxcbiAgICAgIGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgIHJldHVybiBbaW5kZXggJSBOX1NMSUNFMSxcbiAgICAgIGluZGV4IC8gTl9TTElDRTEgfCAwXTtcbiAgICAgIH0sXG4gICAgICBmdW5jdGlvbihjdXJyZW50LFxuICAgICAgbW92ZSkge1xuICAgICAgICB2YXIgZmxpcCxcbiAgICAgIG5ld0ZsaXAsXG4gICAgICBuZXdTbGljZSxcbiAgICAgIHNsaWNlO1xuICAgICAgICBbc2xpY2UsXG4gICAgICBmbGlwXSA9IGN1cnJlbnQ7XG4gICAgICAgIG5ld1NsaWNlID0gQ3ViZS5tb3ZlVGFibGVzLkZSdG9CUltzbGljZSAqIDI0XVttb3ZlXSAvIDI0IHwgMDtcbiAgICAgICAgbmV3RmxpcCA9IEN1YmUubW92ZVRhYmxlcy5mbGlwW2ZsaXBdW21vdmVdO1xuICAgICAgICByZXR1cm4gbmV3RmxpcCAqIE5fU0xJQ0UxICsgbmV3U2xpY2U7XG4gICAgICB9XG4gICAgXSxcbiAgICBzbGljZVVSRnRvRExGUGFyaXR5OiBbXG4gICAgICAyLFxuICAgICAgTl9TTElDRTIgKiBOX1VSRnRvRExGICogTl9QQVJJVFksXG4gICAgICBmdW5jdGlvbihpbmRleCkge1xuICAgICAgICByZXR1cm4gW2luZGV4ICUgMixcbiAgICAgIChpbmRleCAvIDIgfCAwKSAlIE5fU0xJQ0UyLFxuICAgICAgKGluZGV4IC8gMiB8IDApIC8gTl9TTElDRTIgfCAwXTtcbiAgICAgIH0sXG4gICAgICBmdW5jdGlvbihjdXJyZW50LFxuICAgICAgbW92ZSkge1xuICAgICAgICB2YXIgVVJGdG9ETEYsXG4gICAgICBuZXdQYXJpdHksXG4gICAgICBuZXdTbGljZSxcbiAgICAgIG5ld1VSRnRvRExGLFxuICAgICAgcGFyaXR5LFxuICAgICAgc2xpY2U7XG4gICAgICAgIFtwYXJpdHksXG4gICAgICBzbGljZSxcbiAgICAgIFVSRnRvRExGXSA9IGN1cnJlbnQ7XG4gICAgICAgIG5ld1Bhcml0eSA9IEN1YmUubW92ZVRhYmxlcy5wYXJpdHlbcGFyaXR5XVttb3ZlXTtcbiAgICAgICAgbmV3U2xpY2UgPSBDdWJlLm1vdmVUYWJsZXMuRlJ0b0JSW3NsaWNlXVttb3ZlXTtcbiAgICAgICAgbmV3VVJGdG9ETEYgPSBDdWJlLm1vdmVUYWJsZXMuVVJGdG9ETEZbVVJGdG9ETEZdW21vdmVdO1xuICAgICAgICByZXR1cm4gKG5ld1VSRnRvRExGICogTl9TTElDRTIgKyBuZXdTbGljZSkgKiAyICsgbmV3UGFyaXR5O1xuICAgICAgfVxuICAgIF0sXG4gICAgc2xpY2VVUnRvREZQYXJpdHk6IFtcbiAgICAgIDIsXG4gICAgICBOX1NMSUNFMiAqIE5fVVJ0b0RGICogTl9QQVJJVFksXG4gICAgICBmdW5jdGlvbihpbmRleCkge1xuICAgICAgICByZXR1cm4gW2luZGV4ICUgMixcbiAgICAgIChpbmRleCAvIDIgfCAwKSAlIE5fU0xJQ0UyLFxuICAgICAgKGluZGV4IC8gMiB8IDApIC8gTl9TTElDRTIgfCAwXTtcbiAgICAgIH0sXG4gICAgICBmdW5jdGlvbihjdXJyZW50LFxuICAgICAgbW92ZSkge1xuICAgICAgICB2YXIgVVJ0b0RGLFxuICAgICAgbmV3UGFyaXR5LFxuICAgICAgbmV3U2xpY2UsXG4gICAgICBuZXdVUnRvREYsXG4gICAgICBwYXJpdHksXG4gICAgICBzbGljZTtcbiAgICAgICAgW3Bhcml0eSxcbiAgICAgIHNsaWNlLFxuICAgICAgVVJ0b0RGXSA9IGN1cnJlbnQ7XG4gICAgICAgIG5ld1Bhcml0eSA9IEN1YmUubW92ZVRhYmxlcy5wYXJpdHlbcGFyaXR5XVttb3ZlXTtcbiAgICAgICAgbmV3U2xpY2UgPSBDdWJlLm1vdmVUYWJsZXMuRlJ0b0JSW3NsaWNlXVttb3ZlXTtcbiAgICAgICAgbmV3VVJ0b0RGID0gQ3ViZS5tb3ZlVGFibGVzLlVSdG9ERltVUnRvREZdW21vdmVdO1xuICAgICAgICByZXR1cm4gKG5ld1VSdG9ERiAqIE5fU0xJQ0UyICsgbmV3U2xpY2UpICogMiArIG5ld1Bhcml0eTtcbiAgICAgIH1cbiAgICBdXG4gIH07XG5cbiAgQ3ViZS5jb21wdXRlUHJ1bmluZ1RhYmxlcyA9IGZ1bmN0aW9uKC4uLnRhYmxlcykge1xuICAgIHZhciBsZW4sIG0sIG5hbWUsIHBhcmFtcywgdGFibGVOYW1lO1xuICAgIGlmICh0YWJsZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0YWJsZXMgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZXN1bHRzO1xuICAgICAgICByZXN1bHRzID0gW107XG4gICAgICAgIGZvciAobmFtZSBpbiBwcnVuaW5nVGFibGVQYXJhbXMpIHtcbiAgICAgICAgICByZXN1bHRzLnB1c2gobmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICB9KSgpO1xuICAgIH1cbiAgICBmb3IgKG0gPSAwLCBsZW4gPSB0YWJsZXMubGVuZ3RoOyBtIDwgbGVuOyBtKyspIHtcbiAgICAgIHRhYmxlTmFtZSA9IHRhYmxlc1ttXTtcbiAgICAgIGlmICh0aGlzLnBydW5pbmdUYWJsZXNbdGFibGVOYW1lXSAhPT0gbnVsbCkge1xuICAgICAgICAvLyBBbHJlYWR5IGNvbXB1dGVkXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgcGFyYW1zID0gcHJ1bmluZ1RhYmxlUGFyYW1zW3RhYmxlTmFtZV07XG4gICAgICB0aGlzLnBydW5pbmdUYWJsZXNbdGFibGVOYW1lXSA9IGNvbXB1dGVQcnVuaW5nVGFibGUoLi4ucGFyYW1zKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQ3ViZS5pbml0U29sdmVyID0gZnVuY3Rpb24oKSB7XG4gICAgQ3ViZS5jb21wdXRlTW92ZVRhYmxlcygpO1xuICAgIHJldHVybiBDdWJlLmNvbXB1dGVQcnVuaW5nVGFibGVzKCk7XG4gIH07XG5cbiAgQ3ViZS5wcm90b3R5cGUuc29sdmVVcHJpZ2h0ID0gZnVuY3Rpb24obWF4RGVwdGggPSAyMikge1xuICAgIHZhciBTdGF0ZSwgZnJlZVN0YXRlcywgbW92ZU5hbWVzLCBwaGFzZTEsIHBoYXNlMXNlYXJjaCwgcGhhc2UyLCBwaGFzZTJzZWFyY2gsIHNvbHV0aW9uLCBzdGF0ZSwgeDtcbiAgICAvLyBOYW1lcyBmb3IgYWxsIG1vdmVzLCBpLmUuIFUsIFUyLCBVJywgRiwgRjIsIC4uLlxuICAgIG1vdmVOYW1lcyA9IChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBmYWNlLCBmYWNlTmFtZSwgbSwgbywgcG93ZXIsIHBvd2VyTmFtZSwgcmVzdWx0O1xuICAgICAgZmFjZU5hbWUgPSBbJ1UnLCAnUicsICdGJywgJ0QnLCAnTCcsICdCJ107XG4gICAgICBwb3dlck5hbWUgPSBbJycsICcyJywgXCInXCJdO1xuICAgICAgcmVzdWx0ID0gW107XG4gICAgICBmb3IgKGZhY2UgPSBtID0gMDsgbSA8PSA1OyBmYWNlID0gKyttKSB7XG4gICAgICAgIGZvciAocG93ZXIgPSBvID0gMDsgbyA8PSAyOyBwb3dlciA9ICsrbykge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKGZhY2VOYW1lW2ZhY2VdICsgcG93ZXJOYW1lW3Bvd2VyXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSkoKTtcbiAgICBTdGF0ZSA9IGNsYXNzIFN0YXRlIHtcbiAgICAgIGNvbnN0cnVjdG9yKGN1YmUpIHtcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3RNb3ZlID0gbnVsbDtcbiAgICAgICAgdGhpcy5kZXB0aCA9IDA7XG4gICAgICAgIGlmIChjdWJlKSB7XG4gICAgICAgICAgdGhpcy5pbml0KGN1YmUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGluaXQoY3ViZSkge1xuICAgICAgICAvLyBQaGFzZSAxIGNvb3JkaW5hdGVzXG4gICAgICAgIHRoaXMuZmxpcCA9IGN1YmUuZmxpcCgpO1xuICAgICAgICB0aGlzLnR3aXN0ID0gY3ViZS50d2lzdCgpO1xuICAgICAgICB0aGlzLnNsaWNlID0gY3ViZS5GUnRvQlIoKSAvIE5fU0xJQ0UyIHwgMDtcbiAgICAgICAgLy8gUGhhc2UgMiBjb29yZGluYXRlc1xuICAgICAgICB0aGlzLnBhcml0eSA9IGN1YmUuY29ybmVyUGFyaXR5KCk7XG4gICAgICAgIHRoaXMuVVJGdG9ETEYgPSBjdWJlLlVSRnRvRExGKCk7XG4gICAgICAgIHRoaXMuRlJ0b0JSID0gY3ViZS5GUnRvQlIoKTtcbiAgICAgICAgLy8gVGhlc2UgYXJlIGxhdGVyIG1lcmdlZCB0byBVUnRvREYgd2hlbiBwaGFzZSAyIGJlZ2luc1xuICAgICAgICB0aGlzLlVSdG9VTCA9IGN1YmUuVVJ0b1VMKCk7XG4gICAgICAgIHRoaXMuVUJ0b0RGID0gY3ViZS5VQnRvREYoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIHNvbHV0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5wYXJlbnQpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQuc29sdXRpb24oKSArIG1vdmVOYW1lc1t0aGlzLmxhc3RNb3ZlXSArICcgJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8jIEhlbHBlcnNcbiAgICAgIG1vdmUodGFibGUsIGluZGV4LCBtb3ZlKSB7XG4gICAgICAgIHJldHVybiBDdWJlLm1vdmVUYWJsZXNbdGFibGVdW2luZGV4XVttb3ZlXTtcbiAgICAgIH1cblxuICAgICAgcHJ1bmluZyh0YWJsZSwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHBydW5pbmcoQ3ViZS5wcnVuaW5nVGFibGVzW3RhYmxlXSwgaW5kZXgpO1xuICAgICAgfVxuXG4gICAgICAvLyMgUGhhc2UgMVxuXG4gICAgICAvLyBSZXR1cm4gdGhlIG5leHQgdmFsaWQgcGhhc2UgMSBtb3ZlcyBmb3IgdGhpcyBzdGF0ZVxuICAgICAgbW92ZXMxKCkge1xuICAgICAgICBpZiAodGhpcy5sYXN0TW92ZSAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBuZXh0TW92ZXMxW3RoaXMubGFzdE1vdmUgLyAzIHwgMF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGFsbE1vdmVzMTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBDb21wdXRlIHRoZSBtaW5pbXVtIG51bWJlciBvZiBtb3ZlcyB0byB0aGUgZW5kIG9mIHBoYXNlIDFcbiAgICAgIG1pbkRpc3QxKCkge1xuICAgICAgICB2YXIgZDEsIGQyO1xuICAgICAgICAvLyBUaGUgbWF4aW11bSBudW1iZXIgb2YgbW92ZXMgdG8gdGhlIGVuZCBvZiBwaGFzZSAxIHdydC4gdGhlXG4gICAgICAgIC8vIGNvbWJpbmF0aW9uIGZsaXAgYW5kIHNsaWNlIGNvb3JkaW5hdGVzIG9ubHlcbiAgICAgICAgZDEgPSB0aGlzLnBydW5pbmcoJ3NsaWNlRmxpcCcsIE5fU0xJQ0UxICogdGhpcy5mbGlwICsgdGhpcy5zbGljZSk7XG4gICAgICAgIC8vIFRoZSBjb21iaW5hdGlvbiBvZiB0d2lzdCBhbmQgc2xpY2UgY29vcmRpbmF0ZXNcbiAgICAgICAgZDIgPSB0aGlzLnBydW5pbmcoJ3NsaWNlVHdpc3QnLCBOX1NMSUNFMSAqIHRoaXMudHdpc3QgKyB0aGlzLnNsaWNlKTtcbiAgICAgICAgLy8gVGhlIHRydWUgbWluaW1hbCBkaXN0YW5jZSBpcyB0aGUgbWF4aW11bSBvZiB0aGVzZSB0d29cbiAgICAgICAgcmV0dXJuIG1heChkMSwgZDIpO1xuICAgICAgfVxuXG4gICAgICAvLyBDb21wdXRlIHRoZSBuZXh0IHBoYXNlIDEgc3RhdGUgZm9yIHRoZSBnaXZlbiBtb3ZlXG4gICAgICBuZXh0MShtb3ZlKSB7XG4gICAgICAgIHZhciBuZXh0O1xuICAgICAgICBuZXh0ID0gZnJlZVN0YXRlcy5wb3AoKTtcbiAgICAgICAgbmV4dC5wYXJlbnQgPSB0aGlzO1xuICAgICAgICBuZXh0Lmxhc3RNb3ZlID0gbW92ZTtcbiAgICAgICAgbmV4dC5kZXB0aCA9IHRoaXMuZGVwdGggKyAxO1xuICAgICAgICBuZXh0LmZsaXAgPSB0aGlzLm1vdmUoJ2ZsaXAnLCB0aGlzLmZsaXAsIG1vdmUpO1xuICAgICAgICBuZXh0LnR3aXN0ID0gdGhpcy5tb3ZlKCd0d2lzdCcsIHRoaXMudHdpc3QsIG1vdmUpO1xuICAgICAgICBuZXh0LnNsaWNlID0gdGhpcy5tb3ZlKCdGUnRvQlInLCB0aGlzLnNsaWNlICogMjQsIG1vdmUpIC8gMjQgfCAwO1xuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgIH1cblxuICAgICAgLy8jIFBoYXNlIDJcblxuICAgICAgLy8gUmV0dXJuIHRoZSBuZXh0IHZhbGlkIHBoYXNlIDIgbW92ZXMgZm9yIHRoaXMgc3RhdGVcbiAgICAgIG1vdmVzMigpIHtcbiAgICAgICAgaWYgKHRoaXMubGFzdE1vdmUgIT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gbmV4dE1vdmVzMlt0aGlzLmxhc3RNb3ZlIC8gMyB8IDBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBhbGxNb3ZlczI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQ29tcHV0ZSB0aGUgbWluaW11bSBudW1iZXIgb2YgbW92ZXMgdG8gdGhlIHNvbHZlZCBjdWJlXG4gICAgICBtaW5EaXN0MigpIHtcbiAgICAgICAgdmFyIGQxLCBkMiwgaW5kZXgxLCBpbmRleDI7XG4gICAgICAgIGluZGV4MSA9IChOX1NMSUNFMiAqIHRoaXMuVVJ0b0RGICsgdGhpcy5GUnRvQlIpICogTl9QQVJJVFkgKyB0aGlzLnBhcml0eTtcbiAgICAgICAgZDEgPSB0aGlzLnBydW5pbmcoJ3NsaWNlVVJ0b0RGUGFyaXR5JywgaW5kZXgxKTtcbiAgICAgICAgaW5kZXgyID0gKE5fU0xJQ0UyICogdGhpcy5VUkZ0b0RMRiArIHRoaXMuRlJ0b0JSKSAqIE5fUEFSSVRZICsgdGhpcy5wYXJpdHk7XG4gICAgICAgIGQyID0gdGhpcy5wcnVuaW5nKCdzbGljZVVSRnRvRExGUGFyaXR5JywgaW5kZXgyKTtcbiAgICAgICAgcmV0dXJuIG1heChkMSwgZDIpO1xuICAgICAgfVxuXG4gICAgICAvLyBJbml0aWFsaXplIHBoYXNlIDIgY29vcmRpbmF0ZXNcbiAgICAgIGluaXQyKHRvcCA9IHRydWUpIHtcbiAgICAgICAgaWYgKHRoaXMucGFyZW50ID09PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIEZvciBvdGhlciBzdGF0ZXMsIHRoZSBwaGFzZSAyIHN0YXRlIGlzIGNvbXB1dGVkIGJhc2VkIG9uXG4gICAgICAgIC8vIHBhcmVudCdzIHN0YXRlLlxuICAgICAgICAvLyBBbHJlYWR5IGFzc2lnbmVkIGZvciB0aGUgaW5pdGlhbCBzdGF0ZVxuICAgICAgICB0aGlzLnBhcmVudC5pbml0MihmYWxzZSk7XG4gICAgICAgIHRoaXMuVVJGdG9ETEYgPSB0aGlzLm1vdmUoJ1VSRnRvRExGJywgdGhpcy5wYXJlbnQuVVJGdG9ETEYsIHRoaXMubGFzdE1vdmUpO1xuICAgICAgICB0aGlzLkZSdG9CUiA9IHRoaXMubW92ZSgnRlJ0b0JSJywgdGhpcy5wYXJlbnQuRlJ0b0JSLCB0aGlzLmxhc3RNb3ZlKTtcbiAgICAgICAgdGhpcy5wYXJpdHkgPSB0aGlzLm1vdmUoJ3Bhcml0eScsIHRoaXMucGFyZW50LnBhcml0eSwgdGhpcy5sYXN0TW92ZSk7XG4gICAgICAgIHRoaXMuVVJ0b1VMID0gdGhpcy5tb3ZlKCdVUnRvVUwnLCB0aGlzLnBhcmVudC5VUnRvVUwsIHRoaXMubGFzdE1vdmUpO1xuICAgICAgICB0aGlzLlVCdG9ERiA9IHRoaXMubW92ZSgnVUJ0b0RGJywgdGhpcy5wYXJlbnQuVUJ0b0RGLCB0aGlzLmxhc3RNb3ZlKTtcbiAgICAgICAgaWYgKHRvcCkge1xuICAgICAgICAgIC8vIFRoaXMgaXMgdGhlIGluaXRpYWwgcGhhc2UgMiBzdGF0ZS4gR2V0IHRoZSBVUnRvREYgY29vcmRpbmF0ZVxuICAgICAgICAgIC8vIGJ5IG1lcmdpbmcgVVJ0b1VMIGFuZCBVQnRvREZcbiAgICAgICAgICByZXR1cm4gdGhpcy5VUnRvREYgPSB0aGlzLm1vdmUoJ21lcmdlVVJ0b0RGJywgdGhpcy5VUnRvVUwsIHRoaXMuVUJ0b0RGKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBDb21wdXRlIHRoZSBuZXh0IHBoYXNlIDIgc3RhdGUgZm9yIHRoZSBnaXZlbiBtb3ZlXG4gICAgICBuZXh0Mihtb3ZlKSB7XG4gICAgICAgIHZhciBuZXh0O1xuICAgICAgICBuZXh0ID0gZnJlZVN0YXRlcy5wb3AoKTtcbiAgICAgICAgbmV4dC5wYXJlbnQgPSB0aGlzO1xuICAgICAgICBuZXh0Lmxhc3RNb3ZlID0gbW92ZTtcbiAgICAgICAgbmV4dC5kZXB0aCA9IHRoaXMuZGVwdGggKyAxO1xuICAgICAgICBuZXh0LlVSRnRvRExGID0gdGhpcy5tb3ZlKCdVUkZ0b0RMRicsIHRoaXMuVVJGdG9ETEYsIG1vdmUpO1xuICAgICAgICBuZXh0LkZSdG9CUiA9IHRoaXMubW92ZSgnRlJ0b0JSJywgdGhpcy5GUnRvQlIsIG1vdmUpO1xuICAgICAgICBuZXh0LnBhcml0eSA9IHRoaXMubW92ZSgncGFyaXR5JywgdGhpcy5wYXJpdHksIG1vdmUpO1xuICAgICAgICBuZXh0LlVSdG9ERiA9IHRoaXMubW92ZSgnVVJ0b0RGJywgdGhpcy5VUnRvREYsIG1vdmUpO1xuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgIH1cblxuICAgIH07XG4gICAgc29sdXRpb24gPSBudWxsO1xuICAgIHBoYXNlMXNlYXJjaCA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICB2YXIgZGVwdGgsIG0sIHJlZiwgcmVzdWx0cztcbiAgICAgIGRlcHRoID0gMDtcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoZGVwdGggPSBtID0gMSwgcmVmID0gbWF4RGVwdGg7ICgxIDw9IHJlZiA/IG0gPD0gcmVmIDogbSA+PSByZWYpOyBkZXB0aCA9IDEgPD0gcmVmID8gKyttIDogLS1tKSB7XG4gICAgICAgIHBoYXNlMShzdGF0ZSwgZGVwdGgpO1xuICAgICAgICBpZiAoc29sdXRpb24gIT09IG51bGwpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXN1bHRzLnB1c2goZGVwdGgrKyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9O1xuICAgIHBoYXNlMSA9IGZ1bmN0aW9uKHN0YXRlLCBkZXB0aCkge1xuICAgICAgdmFyIGxlbiwgbSwgbW92ZSwgbmV4dCwgcmVmLCByZWYxLCByZXN1bHRzO1xuICAgICAgaWYgKGRlcHRoID09PSAwKSB7XG4gICAgICAgIGlmIChzdGF0ZS5taW5EaXN0MSgpID09PSAwKSB7XG4gICAgICAgICAgLy8gTWFrZSBzdXJlIHdlIGRvbid0IHN0YXJ0IHBoYXNlIDIgd2l0aCBhIHBoYXNlIDIgbW92ZSBhcyB0aGVcbiAgICAgICAgICAvLyBsYXN0IG1vdmUgaW4gcGhhc2UgMSwgYmVjYXVzZSBwaGFzZSAyIHdvdWxkIHRoZW4gcmVwZWF0IHRoZVxuICAgICAgICAgIC8vIHNhbWUgbW92ZS5cbiAgICAgICAgICBpZiAoc3RhdGUubGFzdE1vdmUgPT09IG51bGwgfHwgKHJlZiA9IHN0YXRlLmxhc3RNb3ZlLCBpbmRleE9mLmNhbGwoYWxsTW92ZXMyLCByZWYpIDwgMCkpIHtcbiAgICAgICAgICAgIHJldHVybiBwaGFzZTJzZWFyY2goc3RhdGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChkZXB0aCA+IDApIHtcbiAgICAgICAgaWYgKHN0YXRlLm1pbkRpc3QxKCkgPD0gZGVwdGgpIHtcbiAgICAgICAgICByZWYxID0gc3RhdGUubW92ZXMxKCk7XG4gICAgICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgICAgIGZvciAobSA9IDAsIGxlbiA9IHJlZjEubGVuZ3RoOyBtIDwgbGVuOyBtKyspIHtcbiAgICAgICAgICAgIG1vdmUgPSByZWYxW21dO1xuICAgICAgICAgICAgbmV4dCA9IHN0YXRlLm5leHQxKG1vdmUpO1xuICAgICAgICAgICAgcGhhc2UxKG5leHQsIGRlcHRoIC0gMSk7XG4gICAgICAgICAgICBmcmVlU3RhdGVzLnB1c2gobmV4dCk7XG4gICAgICAgICAgICBpZiAoc29sdXRpb24gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXN1bHRzLnB1c2godm9pZCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIHBoYXNlMnNlYXJjaCA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICB2YXIgZGVwdGgsIG0sIHJlZiwgcmVzdWx0cztcbiAgICAgIC8vIEluaXRpYWxpemUgcGhhc2UgMiBjb29yZGluYXRlc1xuICAgICAgc3RhdGUuaW5pdDIoKTtcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoZGVwdGggPSBtID0gMSwgcmVmID0gbWF4RGVwdGggLSBzdGF0ZS5kZXB0aDsgKDEgPD0gcmVmID8gbSA8PSByZWYgOiBtID49IHJlZik7IGRlcHRoID0gMSA8PSByZWYgPyArK20gOiAtLW0pIHtcbiAgICAgICAgcGhhc2UyKHN0YXRlLCBkZXB0aCk7XG4gICAgICAgIGlmIChzb2x1dGlvbiAhPT0gbnVsbCkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdHMucHVzaChkZXB0aCsrKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH07XG4gICAgcGhhc2UyID0gZnVuY3Rpb24oc3RhdGUsIGRlcHRoKSB7XG4gICAgICB2YXIgbGVuLCBtLCBtb3ZlLCBuZXh0LCByZWYsIHJlc3VsdHM7XG4gICAgICBpZiAoZGVwdGggPT09IDApIHtcbiAgICAgICAgaWYgKHN0YXRlLm1pbkRpc3QyKCkgPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gc29sdXRpb24gPSBzdGF0ZS5zb2x1dGlvbigpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGRlcHRoID4gMCkge1xuICAgICAgICBpZiAoc3RhdGUubWluRGlzdDIoKSA8PSBkZXB0aCkge1xuICAgICAgICAgIHJlZiA9IHN0YXRlLm1vdmVzMigpO1xuICAgICAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgICBmb3IgKG0gPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBtIDwgbGVuOyBtKyspIHtcbiAgICAgICAgICAgIG1vdmUgPSByZWZbbV07XG4gICAgICAgICAgICBuZXh0ID0gc3RhdGUubmV4dDIobW92ZSk7XG4gICAgICAgICAgICBwaGFzZTIobmV4dCwgZGVwdGggLSAxKTtcbiAgICAgICAgICAgIGZyZWVTdGF0ZXMucHVzaChuZXh0KTtcbiAgICAgICAgICAgIGlmIChzb2x1dGlvbiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJlc3VsdHMucHVzaCh2b2lkIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgZnJlZVN0YXRlcyA9IChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBtLCByZWYsIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKHggPSBtID0gMCwgcmVmID0gbWF4RGVwdGggKyAxOyAoMCA8PSByZWYgPyBtIDw9IHJlZiA6IG0gPj0gcmVmKTsgeCA9IDAgPD0gcmVmID8gKyttIDogLS1tKSB7XG4gICAgICAgIHJlc3VsdHMucHVzaChuZXcgU3RhdGUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSkoKTtcbiAgICBzdGF0ZSA9IGZyZWVTdGF0ZXMucG9wKCkuaW5pdCh0aGlzKTtcbiAgICBwaGFzZTFzZWFyY2goc3RhdGUpO1xuICAgIGZyZWVTdGF0ZXMucHVzaChzdGF0ZSk7XG4gICAgLy8gVHJpbSB0aGUgdHJhaWxpbmcgc3BhY2VcbiAgICBpZiAoc29sdXRpb24ubGVuZ3RoID4gMCkge1xuICAgICAgc29sdXRpb24gPSBzb2x1dGlvbi5zdWJzdHJpbmcoMCwgc29sdXRpb24ubGVuZ3RoIC0gMSk7XG4gICAgfVxuICAgIHJldHVybiBzb2x1dGlvbjtcbiAgfTtcblxuICBmYWNlTnVtcyA9IHtcbiAgICBVOiAwLFxuICAgIFI6IDEsXG4gICAgRjogMixcbiAgICBEOiAzLFxuICAgIEw6IDQsXG4gICAgQjogNVxuICB9O1xuXG4gIGZhY2VOYW1lcyA9IHtcbiAgICAwOiAnVScsXG4gICAgMTogJ1InLFxuICAgIDI6ICdGJyxcbiAgICAzOiAnRCcsXG4gICAgNDogJ0wnLFxuICAgIDU6ICdCJ1xuICB9O1xuXG4gIEN1YmUucHJvdG90eXBlLnNvbHZlID0gZnVuY3Rpb24obWF4RGVwdGggPSAyMikge1xuICAgIHZhciBjbG9uZSwgbGVuLCBtLCBtb3ZlLCByZWYsIHJvdGF0aW9uLCBzb2x1dGlvbiwgdXByaWdodCwgdXByaWdodFNvbHV0aW9uO1xuICAgIGNsb25lID0gdGhpcy5jbG9uZSgpO1xuICAgIHVwcmlnaHQgPSBjbG9uZS51cHJpZ2h0KCk7XG4gICAgY2xvbmUubW92ZSh1cHJpZ2h0KTtcbiAgICByb3RhdGlvbiA9IG5ldyBDdWJlKCkubW92ZSh1cHJpZ2h0KS5jZW50ZXI7XG4gICAgdXByaWdodFNvbHV0aW9uID0gY2xvbmUuc29sdmVVcHJpZ2h0KG1heERlcHRoKTtcbiAgICBzb2x1dGlvbiA9IFtdO1xuICAgIHJlZiA9IHVwcmlnaHRTb2x1dGlvbi5zcGxpdCgnICcpO1xuICAgIGZvciAobSA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IG0gPCBsZW47IG0rKykge1xuICAgICAgbW92ZSA9IHJlZlttXTtcbiAgICAgIHNvbHV0aW9uLnB1c2goZmFjZU5hbWVzW3JvdGF0aW9uW2ZhY2VOdW1zW21vdmVbMF1dXV0pO1xuICAgICAgaWYgKG1vdmUubGVuZ3RoID4gMSkge1xuICAgICAgICBzb2x1dGlvbltzb2x1dGlvbi5sZW5ndGggLSAxXSArPSBtb3ZlWzFdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc29sdXRpb24uam9pbignICcpO1xuICB9O1xuXG4gIEN1YmUuc2NyYW1ibGUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gQ3ViZS5pbnZlcnNlKEN1YmUucmFuZG9tKCkuc29sdmUoKSk7XG4gIH07XG5cbn0pLmNhbGwodGhpcyk7XG4iLCJleHBvcnQgY29uc3QgQ3ViZSA9IHJlcXVpcmUoJ2N1YmVqcycpO1xuQ3ViZS5pbml0U29sdmVyKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=