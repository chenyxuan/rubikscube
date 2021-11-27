(self["webpackChunkrubikscube"] = self["webpackChunkrubikscube"] || []).push([["src_vueapp_playground_cubejs_ts"],{

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

/***/ "./src/vueapp/playground/cubejs.ts":
/*!*****************************************!*\
  !*** ./src/vueapp/playground/cubejs.ts ***!
  \*****************************************/
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Qsa0NBQWtDO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Qsa0NBQWtDO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGtDQUFrQztBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELGtDQUFrQztBQUN2RjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsa0NBQWtDO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLFNBQVM7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLHFDQUFxQyxTQUFTO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsUUFBUTtBQUNqQyw0QkFBNEIsUUFBUTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxrQ0FBa0M7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLFNBQVM7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RCxrQ0FBa0M7QUFDMUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsU0FBUztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsa0NBQWtDO0FBQzVFO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxTQUFTO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxN0JNLGFBQWEsbUJBQU8sQ0FBQyw4Q0FBUTtBQUNwQyIsInNvdXJjZXMiOlsid2VicGFjazovL3J1Ymlrc2N1YmUvLi9ub2RlX21vZHVsZXMvY3ViZWpzL2luZGV4LmpzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9ub2RlX21vZHVsZXMvY3ViZWpzL2xpYi9jdWJlLmpzIiwid2VicGFjazovL3J1Ymlrc2N1YmUvLi9ub2RlX21vZHVsZXMvY3ViZWpzL2xpYi9zb2x2ZS5qcyIsIndlYnBhY2s6Ly9ydWJpa3NjdWJlLy4vc3JjL3Z1ZWFwcC9wbGF5Z3JvdW5kL2N1YmVqcy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2N1YmUnKTtcbnJlcXVpcmUoJy4vbGliL3NvbHZlJyk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gIC8vIENlbnRlcnNcbiAgdmFyIEIsIEJMLCBCUiwgQ3ViZSwgRCwgREIsIERCTCwgREYsIERGUiwgREwsIERMRiwgRFIsIERSQiwgRiwgRkwsIEZSLCBMLCBSLCBVLCBVQiwgVUJSLCBVRiwgVUZMLCBVTCwgVUxCLCBVUiwgVVJGLCBjZW50ZXJDb2xvciwgY2VudGVyRmFjZWxldCwgY29ybmVyQ29sb3IsIGNvcm5lckZhY2VsZXQsIGVkZ2VDb2xvciwgZWRnZUZhY2VsZXQ7XG5cbiAgW1UsIFIsIEYsIEQsIEwsIEJdID0gWzAsIDEsIDIsIDMsIDQsIDVdO1xuXG4gIC8vIENvcm5lcnNcbiAgW1VSRiwgVUZMLCBVTEIsIFVCUiwgREZSLCBETEYsIERCTCwgRFJCXSA9IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3XTtcblxuICAvLyBFZGdlc1xuICBbVVIsIFVGLCBVTCwgVUIsIERSLCBERiwgREwsIERCLCBGUiwgRkwsIEJMLCBCUl0gPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExXTtcblxuICBbY2VudGVyRmFjZWxldCwgY29ybmVyRmFjZWxldCwgZWRnZUZhY2VsZXRdID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciBfQiwgX0QsIF9GLCBfTCwgX1IsIF9VO1xuICAgIF9VID0gZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIHggLSAxO1xuICAgIH07XG4gICAgX1IgPSBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gX1UoOSkgKyB4O1xuICAgIH07XG4gICAgX0YgPSBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gX1IoOSkgKyB4O1xuICAgIH07XG4gICAgX0QgPSBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gX0YoOSkgKyB4O1xuICAgIH07XG4gICAgX0wgPSBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gX0QoOSkgKyB4O1xuICAgIH07XG4gICAgX0IgPSBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gX0woOSkgKyB4O1xuICAgIH07XG4gICAgcmV0dXJuIFtcbiAgICAgIC8vIENlbnRlcnNcbiAgICAgIFs0LFxuICAgICAgMTMsXG4gICAgICAyMixcbiAgICAgIDMxLFxuICAgICAgNDAsXG4gICAgICA0OV0sXG4gICAgICAvLyBDb3JuZXJzXG4gICAgICBbW19VKDkpLFxuICAgICAgX1IoMSksXG4gICAgICBfRigzKV0sXG4gICAgICBbX1UoNyksXG4gICAgICBfRigxKSxcbiAgICAgIF9MKDMpXSxcbiAgICAgIFtfVSgxKSxcbiAgICAgIF9MKDEpLFxuICAgICAgX0IoMyldLFxuICAgICAgW19VKDMpLFxuICAgICAgX0IoMSksXG4gICAgICBfUigzKV0sXG4gICAgICBbX0QoMyksXG4gICAgICBfRig5KSxcbiAgICAgIF9SKDcpXSxcbiAgICAgIFtfRCgxKSxcbiAgICAgIF9MKDkpLFxuICAgICAgX0YoNyldLFxuICAgICAgW19EKDcpLFxuICAgICAgX0IoOSksXG4gICAgICBfTCg3KV0sXG4gICAgICBbX0QoOSksXG4gICAgICBfUig5KSxcbiAgICAgIF9CKDcpXV0sXG4gICAgICAvLyBFZGdlc1xuICAgICAgW1tfVSg2KSxcbiAgICAgIF9SKDIpXSxcbiAgICAgIFtfVSg4KSxcbiAgICAgIF9GKDIpXSxcbiAgICAgIFtfVSg0KSxcbiAgICAgIF9MKDIpXSxcbiAgICAgIFtfVSgyKSxcbiAgICAgIF9CKDIpXSxcbiAgICAgIFtfRCg2KSxcbiAgICAgIF9SKDgpXSxcbiAgICAgIFtfRCgyKSxcbiAgICAgIF9GKDgpXSxcbiAgICAgIFtfRCg0KSxcbiAgICAgIF9MKDgpXSxcbiAgICAgIFtfRCg4KSxcbiAgICAgIF9CKDgpXSxcbiAgICAgIFtfRig2KSxcbiAgICAgIF9SKDQpXSxcbiAgICAgIFtfRig0KSxcbiAgICAgIF9MKDYpXSxcbiAgICAgIFtfQig2KSxcbiAgICAgIF9MKDQpXSxcbiAgICAgIFtfQig0KSxcbiAgICAgIF9SKDYpXV1cbiAgICBdO1xuICB9KSgpO1xuXG4gIGNlbnRlckNvbG9yID0gWydVJywgJ1InLCAnRicsICdEJywgJ0wnLCAnQiddO1xuXG4gIGNvcm5lckNvbG9yID0gW1snVScsICdSJywgJ0YnXSwgWydVJywgJ0YnLCAnTCddLCBbJ1UnLCAnTCcsICdCJ10sIFsnVScsICdCJywgJ1InXSwgWydEJywgJ0YnLCAnUiddLCBbJ0QnLCAnTCcsICdGJ10sIFsnRCcsICdCJywgJ0wnXSwgWydEJywgJ1InLCAnQiddXTtcblxuICBlZGdlQ29sb3IgPSBbWydVJywgJ1InXSwgWydVJywgJ0YnXSwgWydVJywgJ0wnXSwgWydVJywgJ0InXSwgWydEJywgJ1InXSwgWydEJywgJ0YnXSwgWydEJywgJ0wnXSwgWydEJywgJ0InXSwgWydGJywgJ1InXSwgWydGJywgJ0wnXSwgWydCJywgJ0wnXSwgWydCJywgJ1InXV07XG5cbiAgQ3ViZSA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgZmFjZU5hbWVzLCBmYWNlTnVtcywgcGFyc2VBbGc7XG5cbiAgICBjbGFzcyBDdWJlIHtcbiAgICAgIGNvbnN0cnVjdG9yKG90aGVyKSB7XG4gICAgICAgIHZhciB4O1xuICAgICAgICBpZiAob3RoZXIgIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuaW5pdChvdGhlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5pZGVudGl0eSgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEZvciBtb3ZlcyB0byBhdm9pZCBhbGxvY2F0aW5nIG5ldyBvYmplY3RzIGVhY2ggdGltZVxuICAgICAgICB0aGlzLm5ld0NlbnRlciA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgaywgcmVzdWx0cztcbiAgICAgICAgICByZXN1bHRzID0gW107XG4gICAgICAgICAgZm9yICh4ID0gayA9IDA7IGsgPD0gNTsgeCA9ICsraykge1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKDApO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgfSkoKTtcbiAgICAgICAgdGhpcy5uZXdDcCA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgaywgcmVzdWx0cztcbiAgICAgICAgICByZXN1bHRzID0gW107XG4gICAgICAgICAgZm9yICh4ID0gayA9IDA7IGsgPD0gNzsgeCA9ICsraykge1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKDApO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgfSkoKTtcbiAgICAgICAgdGhpcy5uZXdFcCA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgaywgcmVzdWx0cztcbiAgICAgICAgICByZXN1bHRzID0gW107XG4gICAgICAgICAgZm9yICh4ID0gayA9IDA7IGsgPD0gMTE7IHggPSArK2spIHtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaCgwKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIH0pKCk7XG4gICAgICAgIHRoaXMubmV3Q28gPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGssIHJlc3VsdHM7XG4gICAgICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgICAgIGZvciAoeCA9IGsgPSAwOyBrIDw9IDc7IHggPSArK2spIHtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaCgwKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIH0pKCk7XG4gICAgICAgIHRoaXMubmV3RW8gPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGssIHJlc3VsdHM7XG4gICAgICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgICAgIGZvciAoeCA9IGsgPSAwOyBrIDw9IDExOyB4ID0gKytrKSB7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2goMCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICB9KSgpO1xuICAgICAgfVxuXG4gICAgICBpbml0KHN0YXRlKSB7XG4gICAgICAgIHRoaXMuY2VudGVyID0gc3RhdGUuY2VudGVyLnNsaWNlKDApO1xuICAgICAgICB0aGlzLmNvID0gc3RhdGUuY28uc2xpY2UoMCk7XG4gICAgICAgIHRoaXMuZXAgPSBzdGF0ZS5lcC5zbGljZSgwKTtcbiAgICAgICAgdGhpcy5jcCA9IHN0YXRlLmNwLnNsaWNlKDApO1xuICAgICAgICByZXR1cm4gdGhpcy5lbyA9IHN0YXRlLmVvLnNsaWNlKDApO1xuICAgICAgfVxuXG4gICAgICBpZGVudGl0eSgpIHtcbiAgICAgICAgdmFyIHg7XG4gICAgICAgIC8vIEluaXRpYWxpemUgdG8gdGhlIGlkZW50aXR5IGN1YmVcbiAgICAgICAgdGhpcy5jZW50ZXIgPSBbMCwgMSwgMiwgMywgNCwgNV07XG4gICAgICAgIHRoaXMuY3AgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgN107XG4gICAgICAgIHRoaXMuY28gPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGssIHJlc3VsdHM7XG4gICAgICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgICAgIGZvciAoeCA9IGsgPSAwOyBrIDw9IDc7IHggPSArK2spIHtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaCgwKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIH0pKCk7XG4gICAgICAgIHRoaXMuZXAgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExXTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW8gPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGssIHJlc3VsdHM7XG4gICAgICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgICAgIGZvciAoeCA9IGsgPSAwOyBrIDw9IDExOyB4ID0gKytrKSB7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2goMCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICB9KSgpO1xuICAgICAgfVxuXG4gICAgICB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgY2VudGVyOiB0aGlzLmNlbnRlcixcbiAgICAgICAgICBjcDogdGhpcy5jcCxcbiAgICAgICAgICBjbzogdGhpcy5jbyxcbiAgICAgICAgICBlcDogdGhpcy5lcCxcbiAgICAgICAgICBlbzogdGhpcy5lb1xuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBhc1N0cmluZygpIHtcbiAgICAgICAgdmFyIGNvcm5lciwgZWRnZSwgaSwgaywgbCwgbSwgbiwgbywgb3JpLCBwLCByZXN1bHQ7XG4gICAgICAgIHJlc3VsdCA9IFtdO1xuICAgICAgICBmb3IgKGkgPSBrID0gMDsgayA8PSA1OyBpID0gKytrKSB7XG4gICAgICAgICAgcmVzdWx0WzkgKiBpICsgNF0gPSBjZW50ZXJDb2xvclt0aGlzLmNlbnRlcltpXV07XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gbCA9IDA7IGwgPD0gNzsgaSA9ICsrbCkge1xuICAgICAgICAgIGNvcm5lciA9IHRoaXMuY3BbaV07XG4gICAgICAgICAgb3JpID0gdGhpcy5jb1tpXTtcbiAgICAgICAgICBmb3IgKG4gPSBtID0gMDsgbSA8PSAyOyBuID0gKyttKSB7XG4gICAgICAgICAgICByZXN1bHRbY29ybmVyRmFjZWxldFtpXVsobiArIG9yaSkgJSAzXV0gPSBjb3JuZXJDb2xvcltjb3JuZXJdW25dO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSBvID0gMDsgbyA8PSAxMTsgaSA9ICsrbykge1xuICAgICAgICAgIGVkZ2UgPSB0aGlzLmVwW2ldO1xuICAgICAgICAgIG9yaSA9IHRoaXMuZW9baV07XG4gICAgICAgICAgZm9yIChuID0gcCA9IDA7IHAgPD0gMTsgbiA9ICsrcCkge1xuICAgICAgICAgICAgcmVzdWx0W2VkZ2VGYWNlbGV0W2ldWyhuICsgb3JpKSAlIDJdXSA9IGVkZ2VDb2xvcltlZGdlXVtuXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdC5qb2luKCcnKTtcbiAgICAgIH1cblxuICAgICAgc3RhdGljIGZyb21TdHJpbmcoc3RyKSB7XG4gICAgICAgIHZhciBjb2wxLCBjb2wyLCBjdWJlLCBpLCBqLCBrLCBsLCBtLCBvLCBvcmksIHAsIHEsIHIsIHJlZjtcbiAgICAgICAgY3ViZSA9IG5ldyBDdWJlO1xuICAgICAgICBmb3IgKGkgPSBrID0gMDsgayA8PSA1OyBpID0gKytrKSB7XG4gICAgICAgICAgZm9yIChqID0gbCA9IDA7IGwgPD0gNTsgaiA9ICsrbCkge1xuICAgICAgICAgICAgaWYgKHN0cls5ICogaSArIDRdID09PSBjZW50ZXJDb2xvcltqXSkge1xuICAgICAgICAgICAgICBjdWJlLmNlbnRlcltpXSA9IGo7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IG0gPSAwOyBtIDw9IDc7IGkgPSArK20pIHtcbiAgICAgICAgICBmb3IgKG9yaSA9IG8gPSAwOyBvIDw9IDI7IG9yaSA9ICsrbykge1xuICAgICAgICAgICAgaWYgKChyZWYgPSBzdHJbY29ybmVyRmFjZWxldFtpXVtvcmldXSkgPT09ICdVJyB8fCByZWYgPT09ICdEJykge1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgY29sMSA9IHN0cltjb3JuZXJGYWNlbGV0W2ldWyhvcmkgKyAxKSAlIDNdXTtcbiAgICAgICAgICBjb2wyID0gc3RyW2Nvcm5lckZhY2VsZXRbaV1bKG9yaSArIDIpICUgM11dO1xuICAgICAgICAgIGZvciAoaiA9IHAgPSAwOyBwIDw9IDc7IGogPSArK3ApIHtcbiAgICAgICAgICAgIGlmIChjb2wxID09PSBjb3JuZXJDb2xvcltqXVsxXSAmJiBjb2wyID09PSBjb3JuZXJDb2xvcltqXVsyXSkge1xuICAgICAgICAgICAgICBjdWJlLmNwW2ldID0gajtcbiAgICAgICAgICAgICAgY3ViZS5jb1tpXSA9IG9yaSAlIDM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IHEgPSAwOyBxIDw9IDExOyBpID0gKytxKSB7XG4gICAgICAgICAgZm9yIChqID0gciA9IDA7IHIgPD0gMTE7IGogPSArK3IpIHtcbiAgICAgICAgICAgIGlmIChzdHJbZWRnZUZhY2VsZXRbaV1bMF1dID09PSBlZGdlQ29sb3Jbal1bMF0gJiYgc3RyW2VkZ2VGYWNlbGV0W2ldWzFdXSA9PT0gZWRnZUNvbG9yW2pdWzFdKSB7XG4gICAgICAgICAgICAgIGN1YmUuZXBbaV0gPSBqO1xuICAgICAgICAgICAgICBjdWJlLmVvW2ldID0gMDtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3RyW2VkZ2VGYWNlbGV0W2ldWzBdXSA9PT0gZWRnZUNvbG9yW2pdWzFdICYmIHN0cltlZGdlRmFjZWxldFtpXVsxXV0gPT09IGVkZ2VDb2xvcltqXVswXSkge1xuICAgICAgICAgICAgICBjdWJlLmVwW2ldID0gajtcbiAgICAgICAgICAgICAgY3ViZS5lb1tpXSA9IDE7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3ViZTtcbiAgICAgIH1cblxuICAgICAgY2xvbmUoKSB7XG4gICAgICAgIHJldHVybiBuZXcgQ3ViZSh0aGlzLnRvSlNPTigpKTtcbiAgICAgIH1cblxuICAgICAgLy8gQSBjbGFzcyBtZXRob2QgcmV0dXJuaW5nIGEgbmV3IHJhbmRvbSBjdWJlXG4gICAgICBzdGF0aWMgcmFuZG9tKCkge1xuICAgICAgICByZXR1cm4gbmV3IEN1YmUoKS5yYW5kb21pemUoKTtcbiAgICAgIH1cblxuICAgICAgaXNTb2x2ZWQoKSB7XG4gICAgICAgIHZhciBjLCBjZW50LCBjbG9uZSwgZSwgaywgbCwgbTtcbiAgICAgICAgY2xvbmUgPSB0aGlzLmNsb25lKCk7XG4gICAgICAgIGNsb25lLm1vdmUoY2xvbmUudXByaWdodCgpKTtcbiAgICAgICAgZm9yIChjZW50ID0gayA9IDA7IGsgPD0gNTsgY2VudCA9ICsraykge1xuICAgICAgICAgIGlmIChjbG9uZS5jZW50ZXJbY2VudF0gIT09IGNlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjID0gbCA9IDA7IGwgPD0gNzsgYyA9ICsrbCkge1xuICAgICAgICAgIGlmIChjbG9uZS5jcFtjXSAhPT0gYykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoY2xvbmUuY29bY10gIT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChlID0gbSA9IDA7IG0gPD0gMTE7IGUgPSArK20pIHtcbiAgICAgICAgICBpZiAoY2xvbmUuZXBbZV0gIT09IGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGNsb25lLmVvW2VdICE9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBNdWx0aXBseSB0aGlzIEN1YmUgd2l0aCBhbm90aGVyIEN1YmUsIHJlc3RyaWN0ZWQgdG8gY2VudGVycy5cbiAgICAgIGNlbnRlck11bHRpcGx5KG90aGVyKSB7XG4gICAgICAgIHZhciBmcm9tLCBrLCB0bztcbiAgICAgICAgZm9yICh0byA9IGsgPSAwOyBrIDw9IDU7IHRvID0gKytrKSB7XG4gICAgICAgICAgZnJvbSA9IG90aGVyLmNlbnRlclt0b107XG4gICAgICAgICAgdGhpcy5uZXdDZW50ZXJbdG9dID0gdGhpcy5jZW50ZXJbZnJvbV07XG4gICAgICAgIH1cbiAgICAgICAgW3RoaXMuY2VudGVyLCB0aGlzLm5ld0NlbnRlcl0gPSBbdGhpcy5uZXdDZW50ZXIsIHRoaXMuY2VudGVyXTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIC8vIE11bHRpcGx5IHRoaXMgQ3ViZSB3aXRoIGFub3RoZXIgQ3ViZSwgcmVzdHJpY3RlZCB0byBjb3JuZXJzLlxuICAgICAgY29ybmVyTXVsdGlwbHkob3RoZXIpIHtcbiAgICAgICAgdmFyIGZyb20sIGssIHRvO1xuICAgICAgICBmb3IgKHRvID0gayA9IDA7IGsgPD0gNzsgdG8gPSArK2spIHtcbiAgICAgICAgICBmcm9tID0gb3RoZXIuY3BbdG9dO1xuICAgICAgICAgIHRoaXMubmV3Q3BbdG9dID0gdGhpcy5jcFtmcm9tXTtcbiAgICAgICAgICB0aGlzLm5ld0NvW3RvXSA9ICh0aGlzLmNvW2Zyb21dICsgb3RoZXIuY29bdG9dKSAlIDM7XG4gICAgICAgIH1cbiAgICAgICAgW3RoaXMuY3AsIHRoaXMubmV3Q3BdID0gW3RoaXMubmV3Q3AsIHRoaXMuY3BdO1xuICAgICAgICBbdGhpcy5jbywgdGhpcy5uZXdDb10gPSBbdGhpcy5uZXdDbywgdGhpcy5jb107XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICAvLyBNdWx0aXBseSB0aGlzIEN1YmUgd2l0aCBhbm90aGVyIEN1YmUsIHJlc3RyaWN0ZWQgdG8gZWRnZXNcbiAgICAgIGVkZ2VNdWx0aXBseShvdGhlcikge1xuICAgICAgICB2YXIgZnJvbSwgaywgdG87XG4gICAgICAgIGZvciAodG8gPSBrID0gMDsgayA8PSAxMTsgdG8gPSArK2spIHtcbiAgICAgICAgICBmcm9tID0gb3RoZXIuZXBbdG9dO1xuICAgICAgICAgIHRoaXMubmV3RXBbdG9dID0gdGhpcy5lcFtmcm9tXTtcbiAgICAgICAgICB0aGlzLm5ld0VvW3RvXSA9ICh0aGlzLmVvW2Zyb21dICsgb3RoZXIuZW9bdG9dKSAlIDI7XG4gICAgICAgIH1cbiAgICAgICAgW3RoaXMuZXAsIHRoaXMubmV3RXBdID0gW3RoaXMubmV3RXAsIHRoaXMuZXBdO1xuICAgICAgICBbdGhpcy5lbywgdGhpcy5uZXdFb10gPSBbdGhpcy5uZXdFbywgdGhpcy5lb107XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICAvLyBNdWx0aXBseSB0aGlzIGN1YmUgd2l0aCBhbm90aGVyIEN1YmVcbiAgICAgIG11bHRpcGx5KG90aGVyKSB7XG4gICAgICAgIHRoaXMuY2VudGVyTXVsdGlwbHkob3RoZXIpO1xuICAgICAgICB0aGlzLmNvcm5lck11bHRpcGx5KG90aGVyKTtcbiAgICAgICAgdGhpcy5lZGdlTXVsdGlwbHkob3RoZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgbW92ZShhcmcpIHtcbiAgICAgICAgdmFyIGZhY2UsIGssIGwsIGxlbiwgbW92ZSwgcG93ZXIsIHJlZiwgcmVmMSwgeDtcbiAgICAgICAgcmVmID0gcGFyc2VBbGcoYXJnKTtcbiAgICAgICAgZm9yIChrID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgayA8IGxlbjsgaysrKSB7XG4gICAgICAgICAgbW92ZSA9IHJlZltrXTtcbiAgICAgICAgICBmYWNlID0gbW92ZSAvIDMgfCAwO1xuICAgICAgICAgIHBvd2VyID0gbW92ZSAlIDM7XG4gICAgICAgICAgZm9yICh4ID0gbCA9IDAsIHJlZjEgPSBwb3dlcjsgKDAgPD0gcmVmMSA/IGwgPD0gcmVmMSA6IGwgPj0gcmVmMSk7IHggPSAwIDw9IHJlZjEgPyArK2wgOiAtLWwpIHtcbiAgICAgICAgICAgIHRoaXMubXVsdGlwbHkoQ3ViZS5tb3Zlc1tmYWNlXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICB1cHJpZ2h0KCkge1xuICAgICAgICB2YXIgY2xvbmUsIGksIGosIGssIGwsIHJlc3VsdDtcbiAgICAgICAgY2xvbmUgPSB0aGlzLmNsb25lKCk7XG4gICAgICAgIHJlc3VsdCA9IFtdO1xuICAgICAgICBmb3IgKGkgPSBrID0gMDsgayA8PSA1OyBpID0gKytrKSB7XG4gICAgICAgICAgaWYgKGNsb25lLmNlbnRlcltpXSA9PT0gRikge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAoaSkge1xuICAgICAgICAgIGNhc2UgRDpcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFwieFwiKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgVTpcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFwieCdcIik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIEI6XG4gICAgICAgICAgICByZXN1bHQucHVzaChcIngyXCIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBSOlxuICAgICAgICAgICAgcmVzdWx0LnB1c2goXCJ5XCIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBMOlxuICAgICAgICAgICAgcmVzdWx0LnB1c2goXCJ5J1wiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgIGNsb25lLm1vdmUocmVzdWx0WzBdKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGogPSBsID0gMDsgbCA8PSA1OyBqID0gKytsKSB7XG4gICAgICAgICAgaWYgKGNsb25lLmNlbnRlcltqXSA9PT0gVSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAoaikge1xuICAgICAgICAgIGNhc2UgTDpcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFwielwiKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgUjpcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFwieidcIik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIEQ6XG4gICAgICAgICAgICByZXN1bHQucHVzaChcInoyXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQuam9pbignICcpO1xuICAgICAgfVxuXG4gICAgICBzdGF0aWMgaW52ZXJzZShhcmcpIHtcbiAgICAgICAgdmFyIGZhY2UsIGssIGxlbiwgbW92ZSwgcG93ZXIsIHJlc3VsdCwgc3RyO1xuICAgICAgICByZXN1bHQgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGssIGxlbiwgcmVmLCByZXN1bHRzO1xuICAgICAgICAgIHJlZiA9IHBhcnNlQWxnKGFyZyk7XG4gICAgICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgICAgIGZvciAoayA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGsgPCBsZW47IGsrKykge1xuICAgICAgICAgICAgbW92ZSA9IHJlZltrXTtcbiAgICAgICAgICAgIGZhY2UgPSBtb3ZlIC8gMyB8IDA7XG4gICAgICAgICAgICBwb3dlciA9IG1vdmUgJSAzO1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGZhY2UgKiAzICsgLShwb3dlciAtIDEpICsgMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICB9KSgpO1xuICAgICAgICByZXN1bHQucmV2ZXJzZSgpO1xuICAgICAgICBpZiAodHlwZW9mIGFyZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBzdHIgPSAnJztcbiAgICAgICAgICBmb3IgKGsgPSAwLCBsZW4gPSByZXN1bHQubGVuZ3RoOyBrIDwgbGVuOyBrKyspIHtcbiAgICAgICAgICAgIG1vdmUgPSByZXN1bHRba107XG4gICAgICAgICAgICBmYWNlID0gbW92ZSAvIDMgfCAwO1xuICAgICAgICAgICAgcG93ZXIgPSBtb3ZlICUgMztcbiAgICAgICAgICAgIHN0ciArPSBmYWNlTmFtZXNbZmFjZV07XG4gICAgICAgICAgICBpZiAocG93ZXIgPT09IDEpIHtcbiAgICAgICAgICAgICAgc3RyICs9ICcyJztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocG93ZXIgPT09IDIpIHtcbiAgICAgICAgICAgICAgc3RyICs9IFwiJ1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RyICs9ICcgJztcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHN0ci5zdWJzdHJpbmcoMCwgc3RyLmxlbmd0aCAtIDEpO1xuICAgICAgICB9IGVsc2UgaWYgKGFyZy5sZW5ndGggIT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdFswXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgfTtcblxuICAgIEN1YmUucHJvdG90eXBlLnJhbmRvbWl6ZSA9IChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcmVQZXJtdXRhdGlvbnNWYWxpZCwgZ2VuZXJhdGVWYWxpZFJhbmRvbU9yaWVudGF0aW9uLCBnZW5lcmF0ZVZhbGlkUmFuZG9tUGVybXV0YXRpb24sIGdldE51bVN3YXBzLCBpc09yaWVudGF0aW9uVmFsaWQsIHJhbmRpbnQsIHJhbmRvbWl6ZU9yaWVudGF0aW9uLCByZXN1bHQsIHNodWZmbGU7XG4gICAgICByYW5kaW50ID0gZnVuY3Rpb24obWluLCBtYXgpIHtcbiAgICAgICAgcmV0dXJuIG1pbiArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSk7XG4gICAgICB9O1xuICAgICAgLy8gRmlzaGVyLVlhdGVzIHNodWZmbGUgYWRhcHRlZCBmcm9tIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI0NTA5NTQvaG93LXRvLXJhbmRvbWl6ZS1zaHVmZmxlLWEtamF2YXNjcmlwdC1hcnJheVxuICAgICAgc2h1ZmZsZSA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgICAgIHZhciBjdXJyZW50SW5kZXgsIHJhbmRvbUluZGV4LCB0ZW1wb3JhcnlWYWx1ZTtcbiAgICAgICAgY3VycmVudEluZGV4ID0gYXJyYXkubGVuZ3RoO1xuICAgICAgICAvLyBXaGlsZSB0aGVyZSByZW1haW4gZWxlbWVudHMgdG8gc2h1ZmZsZS4uLlxuICAgICAgICB3aGlsZSAoY3VycmVudEluZGV4ICE9PSAwKSB7XG4gICAgICAgICAgLy8gUGljayBhIHJlbWFpbmluZyBlbGVtZW50Li4uXG4gICAgICAgICAgcmFuZG9tSW5kZXggPSByYW5kaW50KDAsIGN1cnJlbnRJbmRleCAtIDEpO1xuICAgICAgICAgIGN1cnJlbnRJbmRleCAtPSAxO1xuICAgICAgICAgIC8vIEFuZCBzd2FwIGl0IHdpdGggdGhlIGN1cnJlbnQgZWxlbWVudC5cbiAgICAgICAgICB0ZW1wb3JhcnlWYWx1ZSA9IGFycmF5W2N1cnJlbnRJbmRleF07XG4gICAgICAgICAgW2FycmF5W2N1cnJlbnRJbmRleF0sIGFycmF5W3JhbmRvbUluZGV4XV0gPSBbYXJyYXlbcmFuZG9tSW5kZXhdLCBhcnJheVtjdXJyZW50SW5kZXhdXTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGdldE51bVN3YXBzID0gZnVuY3Rpb24oYXJyKSB7XG4gICAgICAgIHZhciBjdXIsIGN5Y2xlTGVuZ3RoLCBpLCBrLCBudW1Td2FwcywgcmVmLCBzZWVuLCB4O1xuICAgICAgICBudW1Td2FwcyA9IDA7XG4gICAgICAgIHNlZW4gPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGssIHJlZiwgcmVzdWx0cztcbiAgICAgICAgICByZXN1bHRzID0gW107XG4gICAgICAgICAgZm9yICh4ID0gayA9IDAsIHJlZiA9IGFyci5sZW5ndGggLSAxOyAoMCA8PSByZWYgPyBrIDw9IHJlZiA6IGsgPj0gcmVmKTsgeCA9IDAgPD0gcmVmID8gKytrIDogLS1rKSB7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2goZmFsc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgfSkoKTtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAvLyBXZSBjb21wdXRlIHRoZSBjeWNsZSBkZWNvbXBvc2l0aW9uXG4gICAgICAgICAgY3VyID0gLTE7XG4gICAgICAgICAgZm9yIChpID0gayA9IDAsIHJlZiA9IGFyci5sZW5ndGggLSAxOyAoMCA8PSByZWYgPyBrIDw9IHJlZiA6IGsgPj0gcmVmKTsgaSA9IDAgPD0gcmVmID8gKytrIDogLS1rKSB7XG4gICAgICAgICAgICBpZiAoIXNlZW5baV0pIHtcbiAgICAgICAgICAgICAgY3VyID0gaTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChjdXIgPT09IC0xKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgY3ljbGVMZW5ndGggPSAwO1xuICAgICAgICAgIHdoaWxlICghc2VlbltjdXJdKSB7XG4gICAgICAgICAgICBzZWVuW2N1cl0gPSB0cnVlO1xuICAgICAgICAgICAgY3ljbGVMZW5ndGgrKztcbiAgICAgICAgICAgIGN1ciA9IGFycltjdXJdO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBBIGN5Y2xlIGlzIGVxdWl2YWxlbnQgdG8gY3ljbGVMZW5ndGggKyAxIHN3YXBzXG4gICAgICAgICAgbnVtU3dhcHMgKz0gY3ljbGVMZW5ndGggKyAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudW1Td2FwcztcbiAgICAgIH07XG4gICAgICBhcmVQZXJtdXRhdGlvbnNWYWxpZCA9IGZ1bmN0aW9uKGNwLCBlcCkge1xuICAgICAgICB2YXIgbnVtU3dhcHM7XG4gICAgICAgIG51bVN3YXBzID0gZ2V0TnVtU3dhcHMoZXApICsgZ2V0TnVtU3dhcHMoY3ApO1xuICAgICAgICByZXR1cm4gbnVtU3dhcHMgJSAyID09PSAwO1xuICAgICAgfTtcbiAgICAgIGdlbmVyYXRlVmFsaWRSYW5kb21QZXJtdXRhdGlvbiA9IGZ1bmN0aW9uKGNwLCBlcCkge1xuICAgICAgICAvLyBFYWNoIHNodWZmbGUgb25seSB0YWtlcyBhcm91bmQgMTIgb3BlcmF0aW9ucyBhbmQgdGhlcmUncyBhIDUwJVxuICAgICAgICAvLyBjaGFuY2Ugb2YgYSB2YWxpZCBwZXJtdXRhdGlvbiBzbyBpdCdsbCBmaW5pc2ggaW4gdmVyeSBnb29kIHRpbWVcbiAgICAgICAgc2h1ZmZsZShlcCk7XG4gICAgICAgIHNodWZmbGUoY3ApO1xuICAgICAgICB3aGlsZSAoIWFyZVBlcm11dGF0aW9uc1ZhbGlkKGNwLCBlcCkpIHtcbiAgICAgICAgICBzaHVmZmxlKGVwKTtcbiAgICAgICAgICBzaHVmZmxlKGNwKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJhbmRvbWl6ZU9yaWVudGF0aW9uID0gZnVuY3Rpb24oYXJyLCBudW1PcmllbnRhdGlvbnMpIHtcbiAgICAgICAgdmFyIGksIGssIG9yaSwgcmVmO1xuICAgICAgICBvcmkgPSAwO1xuICAgICAgICBmb3IgKGkgPSBrID0gMCwgcmVmID0gYXJyLmxlbmd0aCAtIDE7ICgwIDw9IHJlZiA/IGsgPD0gcmVmIDogayA+PSByZWYpOyBpID0gMCA8PSByZWYgPyArK2sgOiAtLWspIHtcbiAgICAgICAgICBvcmkgKz0gKGFycltpXSA9IHJhbmRpbnQoMCwgbnVtT3JpZW50YXRpb25zIC0gMSkpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgaXNPcmllbnRhdGlvblZhbGlkID0gZnVuY3Rpb24oYXJyLCBudW1PcmllbnRhdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIGFyci5yZWR1Y2UoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgIHJldHVybiBhICsgYjtcbiAgICAgICAgfSkgJSBudW1PcmllbnRhdGlvbnMgPT09IDA7XG4gICAgICB9O1xuICAgICAgZ2VuZXJhdGVWYWxpZFJhbmRvbU9yaWVudGF0aW9uID0gZnVuY3Rpb24oY28sIGVvKSB7XG4gICAgICAgIC8vIFRoZXJlIGlzIGEgMS8yIGFuZCAxLzMgcHJvYmFibHkgcmVzcGVjdGl2ZWx5IG9mIGVhY2ggb2YgdGhlc2VcbiAgICAgICAgLy8gc3VjY2VlZGluZyBzbyB0aGUgcHJvYmFiaWxpdHkgb2YgdGhlbSBydW5uaW5nIDEwIHRpbWVzIGJlZm9yZVxuICAgICAgICAvLyBzdWNjZXNzIGlzIGFscmVhZHkgb25seSAxJSBhbmQgb25seSBnZXRzIGV4cG9uZW50aWFsbHkgbG93ZXJcbiAgICAgICAgLy8gYW5kIGVhY2ggZ2VuZXJhdGlvbiBpcyBvbmx5IGluIHRoZSAxMHMgb2Ygb3BlcmF0aW9ucyB3aGljaCBpcyBub3RoaW5nXG4gICAgICAgIHJhbmRvbWl6ZU9yaWVudGF0aW9uKGNvLCAzKTtcbiAgICAgICAgd2hpbGUgKCFpc09yaWVudGF0aW9uVmFsaWQoY28sIDMpKSB7XG4gICAgICAgICAgcmFuZG9taXplT3JpZW50YXRpb24oY28sIDMpO1xuICAgICAgICB9XG4gICAgICAgIHJhbmRvbWl6ZU9yaWVudGF0aW9uKGVvLCAyKTtcbiAgICAgICAgd2hpbGUgKCFpc09yaWVudGF0aW9uVmFsaWQoZW8sIDIpKSB7XG4gICAgICAgICAgcmFuZG9taXplT3JpZW50YXRpb24oZW8sIDIpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmVzdWx0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGdlbmVyYXRlVmFsaWRSYW5kb21QZXJtdXRhdGlvbih0aGlzLmNwLCB0aGlzLmVwKTtcbiAgICAgICAgZ2VuZXJhdGVWYWxpZFJhbmRvbU9yaWVudGF0aW9uKHRoaXMuY28sIHRoaXMuZW8pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH07XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pKCk7XG5cbiAgICBDdWJlLm1vdmVzID0gW1xuICAgICAge1xuICAgICAgICAvLyBVXG4gICAgICAgIGNlbnRlcjogWzAsIDEsIDIsIDMsIDQsIDVdLFxuICAgICAgICBjcDogW1VCUixcbiAgICAgIFVSRixcbiAgICAgIFVGTCxcbiAgICAgIFVMQixcbiAgICAgIERGUixcbiAgICAgIERMRixcbiAgICAgIERCTCxcbiAgICAgIERSQl0sXG4gICAgICAgIGNvOiBbMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDBdLFxuICAgICAgICBlcDogW1VCLFxuICAgICAgVVIsXG4gICAgICBVRixcbiAgICAgIFVMLFxuICAgICAgRFIsXG4gICAgICBERixcbiAgICAgIERMLFxuICAgICAgREIsXG4gICAgICBGUixcbiAgICAgIEZMLFxuICAgICAgQkwsXG4gICAgICBCUl0sXG4gICAgICAgIGVvOiBbMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgLy8gUlxuICAgICAgICBjZW50ZXI6IFswLCAxLCAyLCAzLCA0LCA1XSxcbiAgICAgICAgY3A6IFtERlIsXG4gICAgICBVRkwsXG4gICAgICBVTEIsXG4gICAgICBVUkYsXG4gICAgICBEUkIsXG4gICAgICBETEYsXG4gICAgICBEQkwsXG4gICAgICBVQlJdLFxuICAgICAgICBjbzogWzIsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAyXSxcbiAgICAgICAgZXA6IFtGUixcbiAgICAgIFVGLFxuICAgICAgVUwsXG4gICAgICBVQixcbiAgICAgIEJSLFxuICAgICAgREYsXG4gICAgICBETCxcbiAgICAgIERCLFxuICAgICAgRFIsXG4gICAgICBGTCxcbiAgICAgIEJMLFxuICAgICAgVVJdLFxuICAgICAgICBlbzogWzAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMF1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIC8vIEZcbiAgICAgICAgY2VudGVyOiBbMCwgMSwgMiwgMywgNCwgNV0sXG4gICAgICAgIGNwOiBbVUZMLFxuICAgICAgRExGLFxuICAgICAgVUxCLFxuICAgICAgVUJSLFxuICAgICAgVVJGLFxuICAgICAgREZSLFxuICAgICAgREJMLFxuICAgICAgRFJCXSxcbiAgICAgICAgY286IFsxLFxuICAgICAgMixcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAwLFxuICAgICAgMF0sXG4gICAgICAgIGVwOiBbVVIsXG4gICAgICBGTCxcbiAgICAgIFVMLFxuICAgICAgVUIsXG4gICAgICBEUixcbiAgICAgIEZSLFxuICAgICAgREwsXG4gICAgICBEQixcbiAgICAgIFVGLFxuICAgICAgREYsXG4gICAgICBCTCxcbiAgICAgIEJSXSxcbiAgICAgICAgZW86IFswLFxuICAgICAgMSxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDEsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMCxcbiAgICAgIDBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAvLyBEXG4gICAgICAgIGNlbnRlcjogWzAsIDEsIDIsIDMsIDQsIDVdLFxuICAgICAgICBjcDogW1VSRixcbiAgICAgIFVGTCxcbiAgICAgIFVMQixcbiAgICAgIFVCUixcbiAgICAgIERMRixcbiAgICAgIERCTCxcbiAgICAgIERSQixcbiAgICAgIERGUl0sXG4gICAgICAgIGNvOiBbMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDBdLFxuICAgICAgICBlcDogW1VSLFxuICAgICAgVUYsXG4gICAgICBVTCxcbiAgICAgIFVCLFxuICAgICAgREYsXG4gICAgICBETCxcbiAgICAgIERCLFxuICAgICAgRFIsXG4gICAgICBGUixcbiAgICAgIEZMLFxuICAgICAgQkwsXG4gICAgICBCUl0sXG4gICAgICAgIGVvOiBbMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgLy8gTFxuICAgICAgICBjZW50ZXI6IFswLCAxLCAyLCAzLCA0LCA1XSxcbiAgICAgICAgY3A6IFtVUkYsXG4gICAgICBVTEIsXG4gICAgICBEQkwsXG4gICAgICBVQlIsXG4gICAgICBERlIsXG4gICAgICBVRkwsXG4gICAgICBETEYsXG4gICAgICBEUkJdLFxuICAgICAgICBjbzogWzAsXG4gICAgICAxLFxuICAgICAgMixcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMixcbiAgICAgIDEsXG4gICAgICAwXSxcbiAgICAgICAgZXA6IFtVUixcbiAgICAgIFVGLFxuICAgICAgQkwsXG4gICAgICBVQixcbiAgICAgIERSLFxuICAgICAgREYsXG4gICAgICBGTCxcbiAgICAgIERCLFxuICAgICAgRlIsXG4gICAgICBVTCxcbiAgICAgIERMLFxuICAgICAgQlJdLFxuICAgICAgICBlbzogWzAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMF1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIC8vIEJcbiAgICAgICAgY2VudGVyOiBbMCwgMSwgMiwgMywgNCwgNV0sXG4gICAgICAgIGNwOiBbVVJGLFxuICAgICAgVUZMLFxuICAgICAgVUJSLFxuICAgICAgRFJCLFxuICAgICAgREZSLFxuICAgICAgRExGLFxuICAgICAgVUxCLFxuICAgICAgREJMXSxcbiAgICAgICAgY286IFswLFxuICAgICAgMCxcbiAgICAgIDEsXG4gICAgICAyLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAyLFxuICAgICAgMV0sXG4gICAgICAgIGVwOiBbVVIsXG4gICAgICBVRixcbiAgICAgIFVMLFxuICAgICAgQlIsXG4gICAgICBEUixcbiAgICAgIERGLFxuICAgICAgREwsXG4gICAgICBCTCxcbiAgICAgIEZSLFxuICAgICAgRkwsXG4gICAgICBVQixcbiAgICAgIERCXSxcbiAgICAgICAgZW86IFswLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAxLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMSxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMSxcbiAgICAgIDFdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAvLyBFXG4gICAgICAgIGNlbnRlcjogW1UsXG4gICAgICBGLFxuICAgICAgTCxcbiAgICAgIEQsXG4gICAgICBCLFxuICAgICAgUl0sXG4gICAgICAgIGNwOiBbVVJGLFxuICAgICAgVUZMLFxuICAgICAgVUxCLFxuICAgICAgVUJSLFxuICAgICAgREZSLFxuICAgICAgRExGLFxuICAgICAgREJMLFxuICAgICAgRFJCXSxcbiAgICAgICAgY286IFswLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMF0sXG4gICAgICAgIGVwOiBbVVIsXG4gICAgICBVRixcbiAgICAgIFVMLFxuICAgICAgVUIsXG4gICAgICBEUixcbiAgICAgIERGLFxuICAgICAgREwsXG4gICAgICBEQixcbiAgICAgIEZMLFxuICAgICAgQkwsXG4gICAgICBCUixcbiAgICAgIEZSXSxcbiAgICAgICAgZW86IFswLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDEsXG4gICAgICAxLFxuICAgICAgMSxcbiAgICAgIDFdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAvLyBNXG4gICAgICAgIGNlbnRlcjogW0IsXG4gICAgICBSLFxuICAgICAgVSxcbiAgICAgIEYsXG4gICAgICBMLFxuICAgICAgRF0sXG4gICAgICAgIGNwOiBbVVJGLFxuICAgICAgVUZMLFxuICAgICAgVUxCLFxuICAgICAgVUJSLFxuICAgICAgREZSLFxuICAgICAgRExGLFxuICAgICAgREJMLFxuICAgICAgRFJCXSxcbiAgICAgICAgY286IFswLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMF0sXG4gICAgICAgIGVwOiBbVVIsXG4gICAgICBVQixcbiAgICAgIFVMLFxuICAgICAgREIsXG4gICAgICBEUixcbiAgICAgIFVGLFxuICAgICAgREwsXG4gICAgICBERixcbiAgICAgIEZSLFxuICAgICAgRkwsXG4gICAgICBCTCxcbiAgICAgIEJSXSxcbiAgICAgICAgZW86IFswLFxuICAgICAgMSxcbiAgICAgIDAsXG4gICAgICAxLFxuICAgICAgMCxcbiAgICAgIDEsXG4gICAgICAwLFxuICAgICAgMSxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAvLyBTXG4gICAgICAgIGNlbnRlcjogW0wsXG4gICAgICBVLFxuICAgICAgRixcbiAgICAgIFIsXG4gICAgICBELFxuICAgICAgQl0sXG4gICAgICAgIGNwOiBbVVJGLFxuICAgICAgVUZMLFxuICAgICAgVUxCLFxuICAgICAgVUJSLFxuICAgICAgREZSLFxuICAgICAgRExGLFxuICAgICAgREJMLFxuICAgICAgRFJCXSxcbiAgICAgICAgY286IFswLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMF0sXG4gICAgICAgIGVwOiBbVUwsXG4gICAgICBVRixcbiAgICAgIERMLFxuICAgICAgVUIsXG4gICAgICBVUixcbiAgICAgIERGLFxuICAgICAgRFIsXG4gICAgICBEQixcbiAgICAgIEZSLFxuICAgICAgRkwsXG4gICAgICBCTCxcbiAgICAgIEJSXSxcbiAgICAgICAgZW86IFsxLFxuICAgICAgMCxcbiAgICAgIDEsXG4gICAgICAwLFxuICAgICAgMSxcbiAgICAgIDAsXG4gICAgICAxLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDBdXG4gICAgICB9XG4gICAgXTtcblxuICAgIGZhY2VOdW1zID0ge1xuICAgICAgVTogMCxcbiAgICAgIFI6IDEsXG4gICAgICBGOiAyLFxuICAgICAgRDogMyxcbiAgICAgIEw6IDQsXG4gICAgICBCOiA1LFxuICAgICAgRTogNixcbiAgICAgIE06IDcsXG4gICAgICBTOiA4LFxuICAgICAgeDogOSxcbiAgICAgIHk6IDEwLFxuICAgICAgejogMTEsXG4gICAgICB1OiAxMixcbiAgICAgIHI6IDEzLFxuICAgICAgZjogMTQsXG4gICAgICBkOiAxNSxcbiAgICAgIGw6IDE2LFxuICAgICAgYjogMTdcbiAgICB9O1xuXG4gICAgZmFjZU5hbWVzID0ge1xuICAgICAgMDogJ1UnLFxuICAgICAgMTogJ1InLFxuICAgICAgMjogJ0YnLFxuICAgICAgMzogJ0QnLFxuICAgICAgNDogJ0wnLFxuICAgICAgNTogJ0InLFxuICAgICAgNjogJ0UnLFxuICAgICAgNzogJ00nLFxuICAgICAgODogJ1MnLFxuICAgICAgOTogJ3gnLFxuICAgICAgMTA6ICd5JyxcbiAgICAgIDExOiAneicsXG4gICAgICAxMjogJ3UnLFxuICAgICAgMTM6ICdyJyxcbiAgICAgIDE0OiAnZicsXG4gICAgICAxNTogJ2QnLFxuICAgICAgMTY6ICdsJyxcbiAgICAgIDE3OiAnYidcbiAgICB9O1xuXG4gICAgcGFyc2VBbGcgPSBmdW5jdGlvbihhcmcpIHtcbiAgICAgIHZhciBrLCBsZW4sIG1vdmUsIHBhcnQsIHBvd2VyLCByZWYsIHJlc3VsdHM7XG4gICAgICBpZiAodHlwZW9mIGFyZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmVmID0gYXJnLnNwbGl0KC9cXHMrLyk7XG4gICAgICAgIC8vIFN0cmluZ1xuICAgICAgICByZXN1bHRzID0gW107XG4gICAgICAgIGZvciAoayA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGsgPCBsZW47IGsrKykge1xuICAgICAgICAgIHBhcnQgPSByZWZba107XG4gICAgICAgICAgaWYgKHBhcnQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvLyBGaXJzdCBhbmQgbGFzdCBjYW4gYmUgZW1wdHlcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocGFydC5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgbW92ZTogJHtwYXJ0fWApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBtb3ZlID0gZmFjZU51bXNbcGFydFswXV07XG4gICAgICAgICAgaWYgKG1vdmUgPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIG1vdmU6ICR7cGFydH1gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHBhcnQubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBwb3dlciA9IDA7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChwYXJ0WzFdID09PSAnMicpIHtcbiAgICAgICAgICAgICAgcG93ZXIgPSAxO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJ0WzFdID09PSBcIidcIikge1xuICAgICAgICAgICAgICBwb3dlciA9IDI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgbW92ZTogJHtwYXJ0fWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXN1bHRzLnB1c2gobW92ZSAqIDMgKyBwb3dlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICB9IGVsc2UgaWYgKGFyZy5sZW5ndGggIT0gbnVsbCkge1xuICAgICAgICAvLyBBbHJlYWR5IGFuIGFycmF5XG4gICAgICAgIHJldHVybiBhcmc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBIHNpbmdsZSBtb3ZlXG4gICAgICAgIHJldHVybiBbYXJnXTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8geFxuICAgIEN1YmUubW92ZXMucHVzaChuZXcgQ3ViZSgpLm1vdmUoXCJSIE0nIEwnXCIpLnRvSlNPTigpKTtcblxuICAgIC8vIHlcbiAgICBDdWJlLm1vdmVzLnB1c2gobmV3IEN1YmUoKS5tb3ZlKFwiVSBFJyBEJ1wiKS50b0pTT04oKSk7XG5cbiAgICAvLyB6XG4gICAgQ3ViZS5tb3Zlcy5wdXNoKG5ldyBDdWJlKCkubW92ZShcIkYgUyBCJ1wiKS50b0pTT04oKSk7XG5cbiAgICAvLyB1XG4gICAgQ3ViZS5tb3Zlcy5wdXNoKG5ldyBDdWJlKCkubW92ZShcIlUgRSdcIikudG9KU09OKCkpO1xuXG4gICAgLy8gclxuICAgIEN1YmUubW92ZXMucHVzaChuZXcgQ3ViZSgpLm1vdmUoXCJSIE0nXCIpLnRvSlNPTigpKTtcblxuICAgIC8vIGZcbiAgICBDdWJlLm1vdmVzLnB1c2gobmV3IEN1YmUoKS5tb3ZlKFwiRiBTXCIpLnRvSlNPTigpKTtcblxuICAgIC8vIGRcbiAgICBDdWJlLm1vdmVzLnB1c2gobmV3IEN1YmUoKS5tb3ZlKFwiRCBFXCIpLnRvSlNPTigpKTtcblxuICAgIC8vIGxcbiAgICBDdWJlLm1vdmVzLnB1c2gobmV3IEN1YmUoKS5tb3ZlKFwiTCBNXCIpLnRvSlNPTigpKTtcblxuICAgIC8vIGJcbiAgICBDdWJlLm1vdmVzLnB1c2gobmV3IEN1YmUoKS5tb3ZlKFwiQiBTJ1wiKS50b0pTT04oKSk7XG5cbiAgICByZXR1cm4gQ3ViZTtcblxuICB9KS5jYWxsKHRoaXMpO1xuXG4gIC8vIyBHbG9iYWxzXG4gIGlmICh0eXBlb2YgbW9kdWxlICE9PSBcInVuZGVmaW5lZFwiICYmIG1vZHVsZSAhPT0gbnVsbCkge1xuICAgIG1vZHVsZS5leHBvcnRzID0gQ3ViZTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLkN1YmUgPSBDdWJlO1xuICB9XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gIHZhciBCLCBCTCwgQlIsIENuaywgQ3ViZSwgRCwgREIsIERCTCwgREYsIERGUiwgREwsIERMRiwgRFIsIERSQiwgRiwgRkwsIEZSLCBJbmNsdWRlLCBMLCBOX0ZMSVAsIE5fRlJ0b0JSLCBOX1BBUklUWSwgTl9TTElDRTEsIE5fU0xJQ0UyLCBOX1RXSVNULCBOX1VCdG9ERiwgTl9VUkZ0b0RMRiwgTl9VUnRvREYsIE5fVVJ0b1VMLCBSLCBVLCBVQiwgVUJSLCBVRiwgVUZMLCBVTCwgVUxCLCBVUiwgVVJGLCBhbGxNb3ZlczEsIGFsbE1vdmVzMiwgY29tcHV0ZU1vdmVUYWJsZSwgY29tcHV0ZVBydW5pbmdUYWJsZSwgZmFjZU5hbWVzLCBmYWNlTnVtcywgZmFjdG9yaWFsLCBrZXksIG1heCwgbWVyZ2VVUnRvREYsIG1vdmVUYWJsZVBhcmFtcywgbmV4dE1vdmVzMSwgbmV4dE1vdmVzMiwgcGVybXV0YXRpb25JbmRleCwgcHJ1bmluZywgcHJ1bmluZ1RhYmxlUGFyYW1zLCByb3RhdGVMZWZ0LCByb3RhdGVSaWdodCwgdmFsdWUsXG4gICAgaW5kZXhPZiA9IFtdLmluZGV4T2Y7XG5cbiAgQ3ViZSA9IHRoaXMuQ3ViZSB8fCByZXF1aXJlKCcuL2N1YmUnKTtcblxuICAvLyBDZW50ZXJzXG4gIFtVLCBSLCBGLCBELCBMLCBCXSA9IFswLCAxLCAyLCAzLCA0LCA1XTtcblxuICAvLyBDb3JuZXJzXG4gIFtVUkYsIFVGTCwgVUxCLCBVQlIsIERGUiwgRExGLCBEQkwsIERSQl0gPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgN107XG5cbiAgLy8gRWRnZXNcbiAgW1VSLCBVRiwgVUwsIFVCLCBEUiwgREYsIERMLCBEQiwgRlIsIEZMLCBCTCwgQlJdID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMV07XG5cbiAgLy8jIEhlbHBlcnNcblxuICAvLyBuIGNob29zZSBrLCBpLmUuIHRoZSBiaW5vbWlhbCBjb2VmZmllY2llbnRcbiAgQ25rID0gZnVuY3Rpb24obiwgaykge1xuICAgIHZhciBpLCBqLCBzO1xuICAgIGlmIChuIDwgaykge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGlmIChrID4gbiAvIDIpIHtcbiAgICAgIGsgPSBuIC0gaztcbiAgICB9XG4gICAgcyA9IDE7XG4gICAgaSA9IG47XG4gICAgaiA9IDE7XG4gICAgd2hpbGUgKGkgIT09IG4gLSBrKSB7XG4gICAgICBzICo9IGk7XG4gICAgICBzIC89IGo7XG4gICAgICBpLS07XG4gICAgICBqKys7XG4gICAgfVxuICAgIHJldHVybiBzO1xuICB9O1xuXG4gIC8vIG4hXG4gIGZhY3RvcmlhbCA9IGZ1bmN0aW9uKG4pIHtcbiAgICB2YXIgZiwgaSwgbSwgcmVmO1xuICAgIGYgPSAxO1xuICAgIGZvciAoaSA9IG0gPSAyLCByZWYgPSBuOyAoMiA8PSByZWYgPyBtIDw9IHJlZiA6IG0gPj0gcmVmKTsgaSA9IDIgPD0gcmVmID8gKyttIDogLS1tKSB7XG4gICAgICBmICo9IGk7XG4gICAgfVxuICAgIHJldHVybiBmO1xuICB9O1xuXG4gIC8vIE1heGltdW0gb2YgdHdvIHZhbHVlc1xuICBtYXggPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgaWYgKGEgPiBiKSB7XG4gICAgICByZXR1cm4gYTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGI7XG4gICAgfVxuICB9O1xuXG4gIC8vIFJvdGF0ZSBlbGVtZW50cyBiZXR3ZWVuIGwgYW5kIHIgbGVmdCBieSBvbmUgcGxhY2VcbiAgcm90YXRlTGVmdCA9IGZ1bmN0aW9uKGFycmF5LCBsLCByKSB7XG4gICAgdmFyIGksIG0sIHJlZiwgcmVmMSwgdG1wO1xuICAgIHRtcCA9IGFycmF5W2xdO1xuICAgIGZvciAoaSA9IG0gPSByZWYgPSBsLCByZWYxID0gciAtIDE7IChyZWYgPD0gcmVmMSA/IG0gPD0gcmVmMSA6IG0gPj0gcmVmMSk7IGkgPSByZWYgPD0gcmVmMSA/ICsrbSA6IC0tbSkge1xuICAgICAgYXJyYXlbaV0gPSBhcnJheVtpICsgMV07XG4gICAgfVxuICAgIHJldHVybiBhcnJheVtyXSA9IHRtcDtcbiAgfTtcblxuICAvLyBSb3RhdGUgZWxlbWVudHMgYmV0d2VlbiBsIGFuZCByIHJpZ2h0IGJ5IG9uZSBwbGFjZVxuICByb3RhdGVSaWdodCA9IGZ1bmN0aW9uKGFycmF5LCBsLCByKSB7XG4gICAgdmFyIGksIG0sIHJlZiwgcmVmMSwgdG1wO1xuICAgIHRtcCA9IGFycmF5W3JdO1xuICAgIGZvciAoaSA9IG0gPSByZWYgPSByLCByZWYxID0gbCArIDE7IChyZWYgPD0gcmVmMSA/IG0gPD0gcmVmMSA6IG0gPj0gcmVmMSk7IGkgPSByZWYgPD0gcmVmMSA/ICsrbSA6IC0tbSkge1xuICAgICAgYXJyYXlbaV0gPSBhcnJheVtpIC0gMV07XG4gICAgfVxuICAgIHJldHVybiBhcnJheVtsXSA9IHRtcDtcbiAgfTtcblxuICAvLyBHZW5lcmF0ZSBhIGZ1bmN0aW9uIHRoYXQgY29tcHV0ZXMgcGVybXV0YXRpb24gaW5kaWNlcy5cblxuICAvLyBUaGUgcGVybXV0YXRpb24gaW5kZXggYWN0dWFsbHkgZW5jb2RlcyB0d28gaW5kaWNlczogQ29tYmluYXRpb24sXG4gIC8vIGkuZS4gcG9zaXRpb25zIG9mIHRoZSBjdWJpZXMgc3RhcnQuLmVuZCAoQSkgYW5kIHRoZWlyIHJlc3BlY3RpdmVcbiAgLy8gcGVybXV0YXRpb24gKEIpLiBUaGUgbWF4aW11bSB2YWx1ZSBmb3IgQiBpc1xuXG4gIC8vICAgbWF4QiA9IChlbmQgLSBzdGFydCArIDEpIVxuXG4gIC8vIGFuZCB0aGUgaW5kZXggaXMgQSAqIG1heEIgKyBCXG4gIHBlcm11dGF0aW9uSW5kZXggPSBmdW5jdGlvbihjb250ZXh0LCBzdGFydCwgZW5kLCBmcm9tRW5kID0gZmFsc2UpIHtcbiAgICB2YXIgaSwgbWF4QWxsLCBtYXhCLCBtYXhPdXIsIG91ciwgcGVybU5hbWU7XG4gICAgbWF4T3VyID0gZW5kIC0gc3RhcnQ7XG4gICAgbWF4QiA9IGZhY3RvcmlhbChtYXhPdXIgKyAxKTtcbiAgICBpZiAoY29udGV4dCA9PT0gJ2Nvcm5lcnMnKSB7XG4gICAgICBtYXhBbGwgPSA3O1xuICAgICAgcGVybU5hbWUgPSAnY3AnO1xuICAgIH0gZWxzZSB7XG4gICAgICBtYXhBbGwgPSAxMTtcbiAgICAgIHBlcm1OYW1lID0gJ2VwJztcbiAgICB9XG4gICAgb3VyID0gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG0sIHJlZiwgcmVzdWx0cztcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaSA9IG0gPSAwLCByZWYgPSBtYXhPdXI7ICgwIDw9IHJlZiA/IG0gPD0gcmVmIDogbSA+PSByZWYpOyBpID0gMCA8PSByZWYgPyArK20gOiAtLW0pIHtcbiAgICAgICAgcmVzdWx0cy5wdXNoKDApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSkoKTtcbiAgICByZXR1cm4gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgIHZhciBhLCBiLCBjLCBqLCBrLCBtLCBvLCBwLCBwZXJtLCBxLCByZWYsIHJlZjEsIHJlZjEwLCByZWYyLCByZWYzLCByZWY0LCByZWY1LCByZWY2LCByZWY3LCByZWY4LCByZWY5LCB0LCB1LCB3LCB4LCB5LCB6O1xuICAgICAgaWYgKGluZGV4ICE9IG51bGwpIHtcbiAgICAgICAgZm9yIChpID0gbSA9IDAsIHJlZiA9IG1heE91cjsgKDAgPD0gcmVmID8gbSA8PSByZWYgOiBtID49IHJlZik7IGkgPSAwIDw9IHJlZiA/ICsrbSA6IC0tbSkge1xuICAgICAgICAgIC8vIFJlc2V0IG91ciB0byBbc3RhcnQuLmVuZF1cbiAgICAgICAgICBvdXJbaV0gPSBpICsgc3RhcnQ7XG4gICAgICAgIH1cbiAgICAgICAgYiA9IGluZGV4ICUgbWF4QjsgLy8gcGVybXV0YXRpb25cbiAgICAgICAgYSA9IGluZGV4IC8gbWF4QiB8IDA7IC8vIGNvbWJpbmF0aW9uXG4gICAgICAgIFxuICAgICAgICAvLyBJbnZhbGlkYXRlIGFsbCBlZGdlc1xuICAgICAgICBwZXJtID0gdGhpc1twZXJtTmFtZV07XG4gICAgICAgIGZvciAoaSA9IG8gPSAwLCByZWYxID0gbWF4QWxsOyAoMCA8PSByZWYxID8gbyA8PSByZWYxIDogbyA+PSByZWYxKTsgaSA9IDAgPD0gcmVmMSA/ICsrbyA6IC0tbykge1xuICAgICAgICAgIHBlcm1baV0gPSAtMTtcbiAgICAgICAgfVxuLy8gR2VuZXJhdGUgcGVybXV0YXRpb24gZnJvbSBpbmRleCBiXG4gICAgICAgIGZvciAoaiA9IHAgPSAxLCByZWYyID0gbWF4T3VyOyAoMSA8PSByZWYyID8gcCA8PSByZWYyIDogcCA+PSByZWYyKTsgaiA9IDEgPD0gcmVmMiA/ICsrcCA6IC0tcCkge1xuICAgICAgICAgIGsgPSBiICUgKGogKyAxKTtcbiAgICAgICAgICBiID0gYiAvIChqICsgMSkgfCAwO1xuICAgICAgICAgIC8vIFRPRE86IEltcGxlbWVudCByb3RhdGVSaWdodEJ5KG91ciwgMCwgaiwgaylcbiAgICAgICAgICB3aGlsZSAoayA+IDApIHtcbiAgICAgICAgICAgIHJvdGF0ZVJpZ2h0KG91ciwgMCwgaik7XG4gICAgICAgICAgICBrLS07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIEdlbmVyYXRlIGNvbWJpbmF0aW9uIGFuZCBzZXQgb3VyIGVkZ2VzXG4gICAgICAgIHggPSBtYXhPdXI7XG4gICAgICAgIGlmIChmcm9tRW5kKSB7XG4gICAgICAgICAgZm9yIChqID0gcSA9IDAsIHJlZjMgPSBtYXhBbGw7ICgwIDw9IHJlZjMgPyBxIDw9IHJlZjMgOiBxID49IHJlZjMpOyBqID0gMCA8PSByZWYzID8gKytxIDogLS1xKSB7XG4gICAgICAgICAgICBjID0gQ25rKG1heEFsbCAtIGosIHggKyAxKTtcbiAgICAgICAgICAgIGlmIChhIC0gYyA+PSAwKSB7XG4gICAgICAgICAgICAgIHBlcm1bal0gPSBvdXJbbWF4T3VyIC0geF07XG4gICAgICAgICAgICAgIGEgLT0gYztcbiAgICAgICAgICAgICAgeC0tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3IgKGogPSB0ID0gcmVmNCA9IG1heEFsbDsgKHJlZjQgPD0gMCA/IHQgPD0gMCA6IHQgPj0gMCk7IGogPSByZWY0IDw9IDAgPyArK3QgOiAtLXQpIHtcbiAgICAgICAgICAgIGMgPSBDbmsoaiwgeCArIDEpO1xuICAgICAgICAgICAgaWYgKGEgLSBjID49IDApIHtcbiAgICAgICAgICAgICAgcGVybVtqXSA9IG91clt4XTtcbiAgICAgICAgICAgICAgYSAtPSBjO1xuICAgICAgICAgICAgICB4LS07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGVybSA9IHRoaXNbcGVybU5hbWVdO1xuICAgICAgICBmb3IgKGkgPSB1ID0gMCwgcmVmNSA9IG1heE91cjsgKDAgPD0gcmVmNSA/IHUgPD0gcmVmNSA6IHUgPj0gcmVmNSk7IGkgPSAwIDw9IHJlZjUgPyArK3UgOiAtLXUpIHtcbiAgICAgICAgICBvdXJbaV0gPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBhID0gYiA9IHggPSAwO1xuICAgICAgICAvLyBDb21wdXRlIHRoZSBpbmRleCBhIDwgKChtYXhBbGwgKyAxKSBjaG9vc2UgKG1heE91ciArIDEpKSBhbmRcbiAgICAgICAgLy8gdGhlIHBlcm11dGF0aW9uXG4gICAgICAgIGlmIChmcm9tRW5kKSB7XG4gICAgICAgICAgZm9yIChqID0gdyA9IHJlZjYgPSBtYXhBbGw7IChyZWY2IDw9IDAgPyB3IDw9IDAgOiB3ID49IDApOyBqID0gcmVmNiA8PSAwID8gKyt3IDogLS13KSB7XG4gICAgICAgICAgICBpZiAoKHN0YXJ0IDw9IChyZWY3ID0gcGVybVtqXSkgJiYgcmVmNyA8PSBlbmQpKSB7XG4gICAgICAgICAgICAgIGEgKz0gQ25rKG1heEFsbCAtIGosIHggKyAxKTtcbiAgICAgICAgICAgICAgb3VyW21heE91ciAtIHhdID0gcGVybVtqXTtcbiAgICAgICAgICAgICAgeCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3IgKGogPSB5ID0gMCwgcmVmOCA9IG1heEFsbDsgKDAgPD0gcmVmOCA/IHkgPD0gcmVmOCA6IHkgPj0gcmVmOCk7IGogPSAwIDw9IHJlZjggPyArK3kgOiAtLXkpIHtcbiAgICAgICAgICAgIGlmICgoc3RhcnQgPD0gKHJlZjkgPSBwZXJtW2pdKSAmJiByZWY5IDw9IGVuZCkpIHtcbiAgICAgICAgICAgICAgYSArPSBDbmsoaiwgeCArIDEpO1xuICAgICAgICAgICAgICBvdXJbeF0gPSBwZXJtW2pdO1xuICAgICAgICAgICAgICB4Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4vLyBDb21wdXRlIHRoZSBpbmRleCBiIDwgKG1heE91ciArIDEpISBmb3IgdGhlIHBlcm11dGF0aW9uXG4gICAgICAgIGZvciAoaiA9IHogPSByZWYxMCA9IG1heE91cjsgKHJlZjEwIDw9IDAgPyB6IDw9IDAgOiB6ID49IDApOyBqID0gcmVmMTAgPD0gMCA/ICsreiA6IC0teikge1xuICAgICAgICAgIGsgPSAwO1xuICAgICAgICAgIHdoaWxlIChvdXJbal0gIT09IHN0YXJ0ICsgaikge1xuICAgICAgICAgICAgcm90YXRlTGVmdChvdXIsIDAsIGopO1xuICAgICAgICAgICAgaysrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBiID0gKGogKyAxKSAqIGIgKyBrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhICogbWF4QiArIGI7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICBJbmNsdWRlID0ge1xuICAgIC8vIFRoZSB0d2lzdCBvZiB0aGUgOCBjb3JuZXJzLCAwIDw9IHR3aXN0IDwgM143LiBUaGUgb3JpZW50YXRpb24gb2ZcbiAgICAvLyB0aGUgRFJCIGNvcm5lciBpcyBmdWxseSBkZXRlcm1pbmVkIGJ5IHRoZSBvcmllbnRhdGlvbiBvZiB0aGUgb3RoZXJcbiAgICAvLyBjb3JuZXJzLlxuICAgIHR3aXN0OiBmdW5jdGlvbih0d2lzdCkge1xuICAgICAgdmFyIGksIG0sIG8sIG9yaSwgcGFyaXR5LCB2O1xuICAgICAgaWYgKHR3aXN0ICE9IG51bGwpIHtcbiAgICAgICAgcGFyaXR5ID0gMDtcbiAgICAgICAgZm9yIChpID0gbSA9IDY7IG0gPj0gMDsgaSA9IC0tbSkge1xuICAgICAgICAgIG9yaSA9IHR3aXN0ICUgMztcbiAgICAgICAgICB0d2lzdCA9ICh0d2lzdCAvIDMpIHwgMDtcbiAgICAgICAgICB0aGlzLmNvW2ldID0gb3JpO1xuICAgICAgICAgIHBhcml0eSArPSBvcmk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb1s3XSA9ICgzIC0gcGFyaXR5ICUgMykgJSAzO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHYgPSAwO1xuICAgICAgICBmb3IgKGkgPSBvID0gMDsgbyA8PSA2OyBpID0gKytvKSB7XG4gICAgICAgICAgdiA9IDMgKiB2ICsgdGhpcy5jb1tpXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdjtcbiAgICAgIH1cbiAgICB9LFxuICAgIC8vIFRoZSBmbGlwIG9mIHRoZSAxMiBlZGdlcywgMCA8PSBmbGlwIDwgMl4xMS4gVGhlIG9yaWVudGF0aW9uIG9mIHRoZVxuICAgIC8vIEJSIGVkZ2UgaXMgZnVsbHkgZGV0ZXJtaW5lZCBieSB0aGUgb3JpZW50YXRpb24gb2YgdGhlIG90aGVyIGVkZ2VzLlxuICAgIGZsaXA6IGZ1bmN0aW9uKGZsaXApIHtcbiAgICAgIHZhciBpLCBtLCBvLCBvcmksIHBhcml0eSwgdjtcbiAgICAgIGlmIChmbGlwICE9IG51bGwpIHtcbiAgICAgICAgcGFyaXR5ID0gMDtcbiAgICAgICAgZm9yIChpID0gbSA9IDEwOyBtID49IDA7IGkgPSAtLW0pIHtcbiAgICAgICAgICBvcmkgPSBmbGlwICUgMjtcbiAgICAgICAgICBmbGlwID0gZmxpcCAvIDIgfCAwO1xuICAgICAgICAgIHRoaXMuZW9baV0gPSBvcmk7XG4gICAgICAgICAgcGFyaXR5ICs9IG9yaTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVvWzExXSA9ICgyIC0gcGFyaXR5ICUgMikgJSAyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHYgPSAwO1xuICAgICAgICBmb3IgKGkgPSBvID0gMDsgbyA8PSAxMDsgaSA9ICsrbykge1xuICAgICAgICAgIHYgPSAyICogdiArIHRoaXMuZW9baV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHY7XG4gICAgICB9XG4gICAgfSxcbiAgICAvLyBQYXJpdHkgb2YgdGhlIGNvcm5lciBwZXJtdXRhdGlvblxuICAgIGNvcm5lclBhcml0eTogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSwgaiwgbSwgbywgcmVmLCByZWYxLCByZWYyLCByZWYzLCBzO1xuICAgICAgcyA9IDA7XG4gICAgICBmb3IgKGkgPSBtID0gcmVmID0gRFJCLCByZWYxID0gVVJGICsgMTsgKHJlZiA8PSByZWYxID8gbSA8PSByZWYxIDogbSA+PSByZWYxKTsgaSA9IHJlZiA8PSByZWYxID8gKyttIDogLS1tKSB7XG4gICAgICAgIGZvciAoaiA9IG8gPSByZWYyID0gaSAtIDEsIHJlZjMgPSBVUkY7IChyZWYyIDw9IHJlZjMgPyBvIDw9IHJlZjMgOiBvID49IHJlZjMpOyBqID0gcmVmMiA8PSByZWYzID8gKytvIDogLS1vKSB7XG4gICAgICAgICAgaWYgKHRoaXMuY3Bbal0gPiB0aGlzLmNwW2ldKSB7XG4gICAgICAgICAgICBzKys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcyAlIDI7XG4gICAgfSxcbiAgICAvLyBQYXJpdHkgb2YgdGhlIGVkZ2VzIHBlcm11dGF0aW9uLiBQYXJpdHkgb2YgY29ybmVycyBhbmQgZWRnZXMgYXJlXG4gICAgLy8gdGhlIHNhbWUgaWYgdGhlIGN1YmUgaXMgc29sdmFibGUuXG4gICAgZWRnZVBhcml0eTogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSwgaiwgbSwgbywgcmVmLCByZWYxLCByZWYyLCByZWYzLCBzO1xuICAgICAgcyA9IDA7XG4gICAgICBmb3IgKGkgPSBtID0gcmVmID0gQlIsIHJlZjEgPSBVUiArIDE7IChyZWYgPD0gcmVmMSA/IG0gPD0gcmVmMSA6IG0gPj0gcmVmMSk7IGkgPSByZWYgPD0gcmVmMSA/ICsrbSA6IC0tbSkge1xuICAgICAgICBmb3IgKGogPSBvID0gcmVmMiA9IGkgLSAxLCByZWYzID0gVVI7IChyZWYyIDw9IHJlZjMgPyBvIDw9IHJlZjMgOiBvID49IHJlZjMpOyBqID0gcmVmMiA8PSByZWYzID8gKytvIDogLS1vKSB7XG4gICAgICAgICAgaWYgKHRoaXMuZXBbal0gPiB0aGlzLmVwW2ldKSB7XG4gICAgICAgICAgICBzKys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcyAlIDI7XG4gICAgfSxcbiAgICAvLyBQZXJtdXRhdGlvbiBvZiB0aGUgc2l4IGNvcm5lcnMgVVJGLCBVRkwsIFVMQiwgVUJSLCBERlIsIERMRlxuICAgIFVSRnRvRExGOiBwZXJtdXRhdGlvbkluZGV4KCdjb3JuZXJzJywgVVJGLCBETEYpLFxuICAgIC8vIFBlcm11dGF0aW9uIG9mIHRoZSB0aHJlZSBlZGdlcyBVUiwgVUYsIFVMXG4gICAgVVJ0b1VMOiBwZXJtdXRhdGlvbkluZGV4KCdlZGdlcycsIFVSLCBVTCksXG4gICAgLy8gUGVybXV0YXRpb24gb2YgdGhlIHRocmVlIGVkZ2VzIFVCLCBEUiwgREZcbiAgICBVQnRvREY6IHBlcm11dGF0aW9uSW5kZXgoJ2VkZ2VzJywgVUIsIERGKSxcbiAgICAvLyBQZXJtdXRhdGlvbiBvZiB0aGUgc2l4IGVkZ2VzIFVSLCBVRiwgVUwsIFVCLCBEUiwgREZcbiAgICBVUnRvREY6IHBlcm11dGF0aW9uSW5kZXgoJ2VkZ2VzJywgVVIsIERGKSxcbiAgICAvLyBQZXJtdXRhdGlvbiBvZiB0aGUgZXF1YXRvciBzbGljZSBlZGdlcyBGUiwgRkwsIEJMIGFuZCBCUlxuICAgIEZSdG9CUjogcGVybXV0YXRpb25JbmRleCgnZWRnZXMnLCBGUiwgQlIsIHRydWUpXG4gIH07XG5cbiAgZm9yIChrZXkgaW4gSW5jbHVkZSkge1xuICAgIHZhbHVlID0gSW5jbHVkZVtrZXldO1xuICAgIEN1YmUucHJvdG90eXBlW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIGNvbXB1dGVNb3ZlVGFibGUgPSBmdW5jdGlvbihjb250ZXh0LCBjb29yZCwgc2l6ZSkge1xuICAgIHZhciBhcHBseSwgY3ViZSwgaSwgaW5uZXIsIGosIGssIG0sIG1vdmUsIG8sIHAsIHJlZiwgcmVzdWx0cztcbiAgICAvLyBMb29wIHRocm91Z2ggYWxsIHZhbGlkIHZhbHVlcyBmb3IgdGhlIGNvb3JkaW5hdGUsIHNldHRpbmcgY3ViZSdzXG4gICAgLy8gc3RhdGUgaW4gZWFjaCBpdGVyYXRpb24uIFRoZW4gYXBwbHkgZWFjaCBvZiB0aGUgMTggbW92ZXMgdG8gdGhlXG4gICAgLy8gY3ViZSwgYW5kIGNvbXB1dGUgdGhlIHJlc3VsdGluZyBjb29yZGluYXRlLlxuICAgIGFwcGx5ID0gY29udGV4dCA9PT0gJ2Nvcm5lcnMnID8gJ2Nvcm5lck11bHRpcGx5JyA6ICdlZGdlTXVsdGlwbHknO1xuICAgIGN1YmUgPSBuZXcgQ3ViZTtcbiAgICByZXN1bHRzID0gW107XG4gICAgZm9yIChpID0gbSA9IDAsIHJlZiA9IHNpemUgLSAxOyAoMCA8PSByZWYgPyBtIDw9IHJlZiA6IG0gPj0gcmVmKTsgaSA9IDAgPD0gcmVmID8gKyttIDogLS1tKSB7XG4gICAgICBjdWJlW2Nvb3JkXShpKTtcbiAgICAgIGlubmVyID0gW107XG4gICAgICBmb3IgKGogPSBvID0gMDsgbyA8PSA1OyBqID0gKytvKSB7XG4gICAgICAgIG1vdmUgPSBDdWJlLm1vdmVzW2pdO1xuICAgICAgICBmb3IgKGsgPSBwID0gMDsgcCA8PSAyOyBrID0gKytwKSB7XG4gICAgICAgICAgY3ViZVthcHBseV0obW92ZSk7XG4gICAgICAgICAgaW5uZXIucHVzaChjdWJlW2Nvb3JkXSgpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyA0dGggZmFjZSB0dXJuIHJlc3RvcmVzIHRoZSBjdWJlXG4gICAgICAgIGN1YmVbYXBwbHldKG1vdmUpO1xuICAgICAgfVxuICAgICAgcmVzdWx0cy5wdXNoKGlubmVyKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH07XG5cbiAgLy8gQmVjYXVzZSB3ZSBvbmx5IGhhdmUgdGhlIHBoYXNlIDIgVVJ0b0RGIGNvb3JkaW5hdGVzLCB3ZSBuZWVkIHRvXG4gIC8vIG1lcmdlIHRoZSBVUnRvVUwgYW5kIFVCdG9ERiBjb29yZGluYXRlcyB0byBVUnRvREYgaW4gdGhlIGJlZ2lubmluZ1xuICAvLyBvZiBwaGFzZSAyLlxuICBtZXJnZVVSdG9ERiA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgYSwgYjtcbiAgICBhID0gbmV3IEN1YmU7XG4gICAgYiA9IG5ldyBDdWJlO1xuICAgIHJldHVybiBmdW5jdGlvbihVUnRvVUwsIFVCdG9ERikge1xuICAgICAgdmFyIGksIG07XG4gICAgICAvLyBDb2xsaXNpb25zIGNhbiBiZSBmb3VuZCBiZWNhdXNlIHVuc2V0IGFyZSBzZXQgdG8gLTFcbiAgICAgIGEuVVJ0b1VMKFVSdG9VTCk7XG4gICAgICBiLlVCdG9ERihVQnRvREYpO1xuICAgICAgZm9yIChpID0gbSA9IDA7IG0gPD0gNzsgaSA9ICsrbSkge1xuICAgICAgICBpZiAoYS5lcFtpXSAhPT0gLTEpIHtcbiAgICAgICAgICBpZiAoYi5lcFtpXSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiAtMTsgLy8gY29sbGlzaW9uXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGIuZXBbaV0gPSBhLmVwW2ldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGIuVVJ0b0RGKCk7XG4gICAgfTtcbiAgfSkoKTtcblxuICBOX1RXSVNUID0gMjE4NzsgLy8gM143IGNvcm5lciBvcmllbnRhdGlvbnNcblxuICBOX0ZMSVAgPSAyMDQ4OyAvLyAyXjExIHBvc3NpYmxlIGVkZ2UgZmxpcHNcblxuICBOX1BBUklUWSA9IDI7IC8vIDIgcG9zc2libGUgcGFyaXRpZXNcblxuICBOX0ZSdG9CUiA9IDExODgwOyAvLyAxMiEvKDEyLTQpISBwZXJtdXRhdGlvbnMgb2YgRlIuLkJSIGVkZ2VzXG5cbiAgTl9TTElDRTEgPSA0OTU7IC8vICgxMiBjaG9vc2UgNCkgcG9zc2libGUgcG9zaXRpb25zIG9mIEZSLi5CUiBlZGdlc1xuXG4gIE5fU0xJQ0UyID0gMjQ7IC8vIDQhIHBlcm11dGF0aW9ucyBvZiBGUi4uQlIgZWRnZXMgaW4gcGhhc2UgMlxuXG4gIE5fVVJGdG9ETEYgPSAyMDE2MDsgLy8gOCEvKDgtNikhIHBlcm11dGF0aW9ucyBvZiBVUkYuLkRMRiBjb3JuZXJzXG5cbiAgXG4gIC8vIFRoZSBVUnRvREYgbW92ZSB0YWJsZSBpcyBvbmx5IGNvbXB1dGVkIGZvciBwaGFzZSAyIGJlY2F1c2UgdGhlIGZ1bGxcbiAgLy8gdGFibGUgd291bGQgaGF2ZSA+NjUwMDAwIGVudHJpZXNcbiAgTl9VUnRvREYgPSAyMDE2MDsgLy8gOCEvKDgtNikhIHBlcm11dGF0aW9uIG9mIFVSLi5ERiBlZGdlcyBpbiBwaGFzZSAyXG5cbiAgTl9VUnRvVUwgPSAxMzIwOyAvLyAxMiEvKDEyLTMpISBwZXJtdXRhdGlvbnMgb2YgVVIuLlVMIGVkZ2VzXG5cbiAgTl9VQnRvREYgPSAxMzIwOyAvLyAxMiEvKDEyLTMpISBwZXJtdXRhdGlvbnMgb2YgVUIuLkRGIGVkZ2VzXG5cbiAgXG4gIC8vIFRoZSBtb3ZlIHRhYmxlIGZvciBwYXJpdHkgaXMgc28gc21hbGwgdGhhdCBpdCdzIGluY2x1ZGVkIGhlcmVcbiAgQ3ViZS5tb3ZlVGFibGVzID0ge1xuICAgIHBhcml0eTogW1sxLCAwLCAxLCAxLCAwLCAxLCAxLCAwLCAxLCAxLCAwLCAxLCAxLCAwLCAxLCAxLCAwLCAxXSwgWzAsIDEsIDAsIDAsIDEsIDAsIDAsIDEsIDAsIDAsIDEsIDAsIDAsIDEsIDAsIDAsIDEsIDBdXSxcbiAgICB0d2lzdDogbnVsbCxcbiAgICBmbGlwOiBudWxsLFxuICAgIEZSdG9CUjogbnVsbCxcbiAgICBVUkZ0b0RMRjogbnVsbCxcbiAgICBVUnRvREY6IG51bGwsXG4gICAgVVJ0b1VMOiBudWxsLFxuICAgIFVCdG9ERjogbnVsbCxcbiAgICBtZXJnZVVSdG9ERjogbnVsbFxuICB9O1xuXG4gIC8vIE90aGVyIG1vdmUgdGFibGVzIGFyZSBjb21wdXRlZCBvbiB0aGUgZmx5XG4gIG1vdmVUYWJsZVBhcmFtcyA9IHtcbiAgICAvLyBuYW1lOiBbc2NvcGUsIHNpemVdXG4gICAgdHdpc3Q6IFsnY29ybmVycycsIE5fVFdJU1RdLFxuICAgIGZsaXA6IFsnZWRnZXMnLCBOX0ZMSVBdLFxuICAgIEZSdG9CUjogWydlZGdlcycsIE5fRlJ0b0JSXSxcbiAgICBVUkZ0b0RMRjogWydjb3JuZXJzJywgTl9VUkZ0b0RMRl0sXG4gICAgVVJ0b0RGOiBbJ2VkZ2VzJywgTl9VUnRvREZdLFxuICAgIFVSdG9VTDogWydlZGdlcycsIE5fVVJ0b1VMXSxcbiAgICBVQnRvREY6IFsnZWRnZXMnLCBOX1VCdG9ERl0sXG4gICAgbWVyZ2VVUnRvREY6IFtdXG4gIH07XG5cbiAgQ3ViZS5jb21wdXRlTW92ZVRhYmxlcyA9IGZ1bmN0aW9uKC4uLnRhYmxlcykge1xuICAgIHZhciBsZW4sIG0sIG5hbWUsIHNjb3BlLCBzaXplLCB0YWJsZU5hbWU7XG4gICAgaWYgKHRhYmxlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRhYmxlcyA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlc3VsdHM7XG4gICAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgZm9yIChuYW1lIGluIG1vdmVUYWJsZVBhcmFtcykge1xuICAgICAgICAgIHJlc3VsdHMucHVzaChuYW1lKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgIH0pKCk7XG4gICAgfVxuICAgIGZvciAobSA9IDAsIGxlbiA9IHRhYmxlcy5sZW5ndGg7IG0gPCBsZW47IG0rKykge1xuICAgICAgdGFibGVOYW1lID0gdGFibGVzW21dO1xuICAgICAgaWYgKHRoaXMubW92ZVRhYmxlc1t0YWJsZU5hbWVdICE9PSBudWxsKSB7XG4gICAgICAgIC8vIEFscmVhZHkgY29tcHV0ZWRcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodGFibGVOYW1lID09PSAnbWVyZ2VVUnRvREYnKSB7XG4gICAgICAgIHRoaXMubW92ZVRhYmxlcy5tZXJnZVVSdG9ERiA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgVUJ0b0RGLCBVUnRvVUwsIG8sIHJlc3VsdHM7XG4gICAgICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgICAgIGZvciAoVVJ0b1VMID0gbyA9IDA7IG8gPD0gMzM1OyBVUnRvVUwgPSArK28pIHtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaCgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZhciBwLCByZXN1bHRzMTtcbiAgICAgICAgICAgICAgcmVzdWx0czEgPSBbXTtcbiAgICAgICAgICAgICAgZm9yIChVQnRvREYgPSBwID0gMDsgcCA8PSAzMzU7IFVCdG9ERiA9ICsrcCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMxLnB1c2gobWVyZ2VVUnRvREYoVVJ0b1VMLCBVQnRvREYpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0czE7XG4gICAgICAgICAgICB9KSgpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgIH0pKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBbc2NvcGUsIHNpemVdID0gbW92ZVRhYmxlUGFyYW1zW3RhYmxlTmFtZV07XG4gICAgICAgIHRoaXMubW92ZVRhYmxlc1t0YWJsZU5hbWVdID0gY29tcHV0ZU1vdmVUYWJsZShzY29wZSwgdGFibGVOYW1lLCBzaXplKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLy8gUGhhc2UgMTogQWxsIG1vdmVzIGFyZSB2YWxpZFxuICBhbGxNb3ZlczEgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMiwgMTMsIDE0LCAxNSwgMTYsIDE3XTtcblxuICAvLyBUaGUgbGlzdCBvZiBuZXh0IHZhbGlkIHBoYXNlIDEgbW92ZXMgd2hlbiB0aGUgZ2l2ZW4gZmFjZSB3YXMgdHVybmVkXG4gIC8vIGluIHRoZSBsYXN0IG1vdmVcbiAgbmV4dE1vdmVzMSA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgZmFjZSwgbGFzdEZhY2UsIG0sIG5leHQsIG8sIHAsIHBvd2VyLCByZXN1bHRzO1xuICAgIHJlc3VsdHMgPSBbXTtcbiAgICBmb3IgKGxhc3RGYWNlID0gbSA9IDA7IG0gPD0gNTsgbGFzdEZhY2UgPSArK20pIHtcbiAgICAgIG5leHQgPSBbXTtcbi8vIERvbid0IGFsbG93IGNvbW11dGluZyBtb3ZlcywgZS5nLiBVIFUnLiBBbHNvIG1ha2Ugc3VyZSB0aGF0XG4vLyBvcHBvc2l0ZSBmYWNlcyBhcmUgYWx3YXlzIG1vdmVkIGluIHRoZSBzYW1lIG9yZGVyLCBpLmUuIGFsbG93XG4vLyBVIEQgYnV0IG5vIEQgVS4gVGhpcyBhdm9pZHMgc2VxdWVuY2VzIGxpa2UgVSBEIFUnLlxuICAgICAgZm9yIChmYWNlID0gbyA9IDA7IG8gPD0gNTsgZmFjZSA9ICsrbykge1xuICAgICAgICBpZiAoZmFjZSAhPT0gbGFzdEZhY2UgJiYgZmFjZSAhPT0gbGFzdEZhY2UgLSAzKSB7XG4vLyBzaW5nbGUsIGRvdWJsZSBvciBpbnZlcnNlIG1vdmVcbiAgICAgICAgICBmb3IgKHBvd2VyID0gcCA9IDA7IHAgPD0gMjsgcG93ZXIgPSArK3ApIHtcbiAgICAgICAgICAgIG5leHQucHVzaChmYWNlICogMyArIHBvd2VyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJlc3VsdHMucHVzaChuZXh0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH0pKCk7XG5cbiAgLy8gUGhhc2UgMjogRG91YmxlIG1vdmVzIG9mIGFsbCBmYWNlcyBwbHVzIHF1YXJ0ZXIgbW92ZXMgb2YgVSBhbmQgRFxuICBhbGxNb3ZlczIgPSBbMCwgMSwgMiwgNCwgNywgOSwgMTAsIDExLCAxMywgMTZdO1xuXG4gIG5leHRNb3ZlczIgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGZhY2UsIGxhc3RGYWNlLCBsZW4sIG0sIG5leHQsIG8sIHAsIHBvd2VyLCBwb3dlcnMsIHJlc3VsdHM7XG4gICAgcmVzdWx0cyA9IFtdO1xuICAgIGZvciAobGFzdEZhY2UgPSBtID0gMDsgbSA8PSA1OyBsYXN0RmFjZSA9ICsrbSkge1xuICAgICAgbmV4dCA9IFtdO1xuICAgICAgZm9yIChmYWNlID0gbyA9IDA7IG8gPD0gNTsgZmFjZSA9ICsrbykge1xuICAgICAgICBpZiAoIShmYWNlICE9PSBsYXN0RmFjZSAmJiBmYWNlICE9PSBsYXN0RmFjZSAtIDMpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWxsb3cgYWxsIG1vdmVzIG9mIFUgYW5kIEQgYW5kIGRvdWJsZSBtb3ZlcyBvZiBvdGhlcnNcbiAgICAgICAgcG93ZXJzID0gZmFjZSA9PT0gMCB8fCBmYWNlID09PSAzID8gWzAsIDEsIDJdIDogWzFdO1xuICAgICAgICBmb3IgKHAgPSAwLCBsZW4gPSBwb3dlcnMubGVuZ3RoOyBwIDwgbGVuOyBwKyspIHtcbiAgICAgICAgICBwb3dlciA9IHBvd2Vyc1twXTtcbiAgICAgICAgICBuZXh0LnB1c2goZmFjZSAqIDMgKyBwb3dlcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJlc3VsdHMucHVzaChuZXh0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH0pKCk7XG5cbiAgLy8gOCB2YWx1ZXMgYXJlIGVuY29kZWQgaW4gb25lIG51bWJlclxuICBwcnVuaW5nID0gZnVuY3Rpb24odGFibGUsIGluZGV4LCB2YWx1ZSkge1xuICAgIHZhciBwb3MsIHNoaWZ0LCBzbG90O1xuICAgIHBvcyA9IGluZGV4ICUgODtcbiAgICBzbG90ID0gaW5kZXggPj4gMztcbiAgICBzaGlmdCA9IHBvcyA8PCAyO1xuICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAvLyBTZXRcbiAgICAgIHRhYmxlW3Nsb3RdICY9IH4oMHhGIDw8IHNoaWZ0KTtcbiAgICAgIHRhYmxlW3Nsb3RdIHw9IHZhbHVlIDw8IHNoaWZ0O1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBHZXRcbiAgICAgIHJldHVybiAodGFibGVbc2xvdF0gJiAoMHhGIDw8IHNoaWZ0KSkgPj4+IHNoaWZ0O1xuICAgIH1cbiAgfTtcblxuICBjb21wdXRlUHJ1bmluZ1RhYmxlID0gZnVuY3Rpb24ocGhhc2UsIHNpemUsIGN1cnJlbnRDb29yZHMsIG5leHRJbmRleCkge1xuICAgIHZhciBjdXJyZW50LCBkZXB0aCwgZG9uZSwgaW5kZXgsIGxlbiwgbSwgbW92ZSwgbW92ZXMsIG5leHQsIG8sIHJlZiwgdGFibGUsIHg7XG4gICAgLy8gSW5pdGlhbGl6ZSBhbGwgdmFsdWVzIHRvIDB4RlxuICAgIHRhYmxlID0gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG0sIHJlZiwgcmVzdWx0cztcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoeCA9IG0gPSAwLCByZWYgPSBNYXRoLmNlaWwoc2l6ZSAvIDgpIC0gMTsgKDAgPD0gcmVmID8gbSA8PSByZWYgOiBtID49IHJlZik7IHggPSAwIDw9IHJlZiA/ICsrbSA6IC0tbSkge1xuICAgICAgICByZXN1bHRzLnB1c2goMHhGRkZGRkZGRik7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9KSgpO1xuICAgIGlmIChwaGFzZSA9PT0gMSkge1xuICAgICAgbW92ZXMgPSBhbGxNb3ZlczE7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1vdmVzID0gYWxsTW92ZXMyO1xuICAgIH1cbiAgICBkZXB0aCA9IDA7XG4gICAgcHJ1bmluZyh0YWJsZSwgMCwgZGVwdGgpO1xuICAgIGRvbmUgPSAxO1xuICAgIC8vIEluIGVhY2ggaXRlcmF0aW9uLCB0YWtlIGVhY2ggc3RhdGUgZm91bmQgaW4gdGhlIHByZXZpb3VzIGRlcHRoIGFuZFxuICAgIC8vIGNvbXB1dGUgdGhlIG5leHQgc3RhdGUuIFN0b3Agd2hlbiBhbGwgc3RhdGVzIGhhdmUgYmVlbiBhc3NpZ25lZCBhXG4gICAgLy8gZGVwdGguXG4gICAgd2hpbGUgKGRvbmUgIT09IHNpemUpIHtcbiAgICAgIGZvciAoaW5kZXggPSBtID0gMCwgcmVmID0gc2l6ZSAtIDE7ICgwIDw9IHJlZiA/IG0gPD0gcmVmIDogbSA+PSByZWYpOyBpbmRleCA9IDAgPD0gcmVmID8gKyttIDogLS1tKSB7XG4gICAgICAgIGlmICghKHBydW5pbmcodGFibGUsIGluZGV4KSA9PT0gZGVwdGgpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudCA9IGN1cnJlbnRDb29yZHMoaW5kZXgpO1xuICAgICAgICBmb3IgKG8gPSAwLCBsZW4gPSBtb3Zlcy5sZW5ndGg7IG8gPCBsZW47IG8rKykge1xuICAgICAgICAgIG1vdmUgPSBtb3Zlc1tvXTtcbiAgICAgICAgICBuZXh0ID0gbmV4dEluZGV4KGN1cnJlbnQsIG1vdmUpO1xuICAgICAgICAgIGlmIChwcnVuaW5nKHRhYmxlLCBuZXh0KSA9PT0gMHhGKSB7XG4gICAgICAgICAgICBwcnVuaW5nKHRhYmxlLCBuZXh0LCBkZXB0aCArIDEpO1xuICAgICAgICAgICAgZG9uZSsrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZGVwdGgrKztcbiAgICB9XG4gICAgcmV0dXJuIHRhYmxlO1xuICB9O1xuXG4gIEN1YmUucHJ1bmluZ1RhYmxlcyA9IHtcbiAgICBzbGljZVR3aXN0OiBudWxsLFxuICAgIHNsaWNlRmxpcDogbnVsbCxcbiAgICBzbGljZVVSRnRvRExGUGFyaXR5OiBudWxsLFxuICAgIHNsaWNlVVJ0b0RGUGFyaXR5OiBudWxsXG4gIH07XG5cbiAgcHJ1bmluZ1RhYmxlUGFyYW1zID0ge1xuICAgIC8vIG5hbWU6IFtwaGFzZSwgc2l6ZSwgY3VycmVudENvb3JkcywgbmV4dEluZGV4XVxuICAgIHNsaWNlVHdpc3Q6IFtcbiAgICAgIDEsXG4gICAgICBOX1NMSUNFMSAqIE5fVFdJU1QsXG4gICAgICBmdW5jdGlvbihpbmRleCkge1xuICAgICAgICByZXR1cm4gW2luZGV4ICUgTl9TTElDRTEsXG4gICAgICBpbmRleCAvIE5fU0xJQ0UxIHwgMF07XG4gICAgICB9LFxuICAgICAgZnVuY3Rpb24oY3VycmVudCxcbiAgICAgIG1vdmUpIHtcbiAgICAgICAgdmFyIG5ld1NsaWNlLFxuICAgICAgbmV3VHdpc3QsXG4gICAgICBzbGljZSxcbiAgICAgIHR3aXN0O1xuICAgICAgICBbc2xpY2UsXG4gICAgICB0d2lzdF0gPSBjdXJyZW50O1xuICAgICAgICBuZXdTbGljZSA9IEN1YmUubW92ZVRhYmxlcy5GUnRvQlJbc2xpY2UgKiAyNF1bbW92ZV0gLyAyNCB8IDA7XG4gICAgICAgIG5ld1R3aXN0ID0gQ3ViZS5tb3ZlVGFibGVzLnR3aXN0W3R3aXN0XVttb3ZlXTtcbiAgICAgICAgcmV0dXJuIG5ld1R3aXN0ICogTl9TTElDRTEgKyBuZXdTbGljZTtcbiAgICAgIH1cbiAgICBdLFxuICAgIHNsaWNlRmxpcDogW1xuICAgICAgMSxcbiAgICAgIE5fU0xJQ0UxICogTl9GTElQLFxuICAgICAgZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIFtpbmRleCAlIE5fU0xJQ0UxLFxuICAgICAgaW5kZXggLyBOX1NMSUNFMSB8IDBdO1xuICAgICAgfSxcbiAgICAgIGZ1bmN0aW9uKGN1cnJlbnQsXG4gICAgICBtb3ZlKSB7XG4gICAgICAgIHZhciBmbGlwLFxuICAgICAgbmV3RmxpcCxcbiAgICAgIG5ld1NsaWNlLFxuICAgICAgc2xpY2U7XG4gICAgICAgIFtzbGljZSxcbiAgICAgIGZsaXBdID0gY3VycmVudDtcbiAgICAgICAgbmV3U2xpY2UgPSBDdWJlLm1vdmVUYWJsZXMuRlJ0b0JSW3NsaWNlICogMjRdW21vdmVdIC8gMjQgfCAwO1xuICAgICAgICBuZXdGbGlwID0gQ3ViZS5tb3ZlVGFibGVzLmZsaXBbZmxpcF1bbW92ZV07XG4gICAgICAgIHJldHVybiBuZXdGbGlwICogTl9TTElDRTEgKyBuZXdTbGljZTtcbiAgICAgIH1cbiAgICBdLFxuICAgIHNsaWNlVVJGdG9ETEZQYXJpdHk6IFtcbiAgICAgIDIsXG4gICAgICBOX1NMSUNFMiAqIE5fVVJGdG9ETEYgKiBOX1BBUklUWSxcbiAgICAgIGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgIHJldHVybiBbaW5kZXggJSAyLFxuICAgICAgKGluZGV4IC8gMiB8IDApICUgTl9TTElDRTIsXG4gICAgICAoaW5kZXggLyAyIHwgMCkgLyBOX1NMSUNFMiB8IDBdO1xuICAgICAgfSxcbiAgICAgIGZ1bmN0aW9uKGN1cnJlbnQsXG4gICAgICBtb3ZlKSB7XG4gICAgICAgIHZhciBVUkZ0b0RMRixcbiAgICAgIG5ld1Bhcml0eSxcbiAgICAgIG5ld1NsaWNlLFxuICAgICAgbmV3VVJGdG9ETEYsXG4gICAgICBwYXJpdHksXG4gICAgICBzbGljZTtcbiAgICAgICAgW3Bhcml0eSxcbiAgICAgIHNsaWNlLFxuICAgICAgVVJGdG9ETEZdID0gY3VycmVudDtcbiAgICAgICAgbmV3UGFyaXR5ID0gQ3ViZS5tb3ZlVGFibGVzLnBhcml0eVtwYXJpdHldW21vdmVdO1xuICAgICAgICBuZXdTbGljZSA9IEN1YmUubW92ZVRhYmxlcy5GUnRvQlJbc2xpY2VdW21vdmVdO1xuICAgICAgICBuZXdVUkZ0b0RMRiA9IEN1YmUubW92ZVRhYmxlcy5VUkZ0b0RMRltVUkZ0b0RMRl1bbW92ZV07XG4gICAgICAgIHJldHVybiAobmV3VVJGdG9ETEYgKiBOX1NMSUNFMiArIG5ld1NsaWNlKSAqIDIgKyBuZXdQYXJpdHk7XG4gICAgICB9XG4gICAgXSxcbiAgICBzbGljZVVSdG9ERlBhcml0eTogW1xuICAgICAgMixcbiAgICAgIE5fU0xJQ0UyICogTl9VUnRvREYgKiBOX1BBUklUWSxcbiAgICAgIGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgIHJldHVybiBbaW5kZXggJSAyLFxuICAgICAgKGluZGV4IC8gMiB8IDApICUgTl9TTElDRTIsXG4gICAgICAoaW5kZXggLyAyIHwgMCkgLyBOX1NMSUNFMiB8IDBdO1xuICAgICAgfSxcbiAgICAgIGZ1bmN0aW9uKGN1cnJlbnQsXG4gICAgICBtb3ZlKSB7XG4gICAgICAgIHZhciBVUnRvREYsXG4gICAgICBuZXdQYXJpdHksXG4gICAgICBuZXdTbGljZSxcbiAgICAgIG5ld1VSdG9ERixcbiAgICAgIHBhcml0eSxcbiAgICAgIHNsaWNlO1xuICAgICAgICBbcGFyaXR5LFxuICAgICAgc2xpY2UsXG4gICAgICBVUnRvREZdID0gY3VycmVudDtcbiAgICAgICAgbmV3UGFyaXR5ID0gQ3ViZS5tb3ZlVGFibGVzLnBhcml0eVtwYXJpdHldW21vdmVdO1xuICAgICAgICBuZXdTbGljZSA9IEN1YmUubW92ZVRhYmxlcy5GUnRvQlJbc2xpY2VdW21vdmVdO1xuICAgICAgICBuZXdVUnRvREYgPSBDdWJlLm1vdmVUYWJsZXMuVVJ0b0RGW1VSdG9ERl1bbW92ZV07XG4gICAgICAgIHJldHVybiAobmV3VVJ0b0RGICogTl9TTElDRTIgKyBuZXdTbGljZSkgKiAyICsgbmV3UGFyaXR5O1xuICAgICAgfVxuICAgIF1cbiAgfTtcblxuICBDdWJlLmNvbXB1dGVQcnVuaW5nVGFibGVzID0gZnVuY3Rpb24oLi4udGFibGVzKSB7XG4gICAgdmFyIGxlbiwgbSwgbmFtZSwgcGFyYW1zLCB0YWJsZU5hbWU7XG4gICAgaWYgKHRhYmxlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRhYmxlcyA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlc3VsdHM7XG4gICAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgZm9yIChuYW1lIGluIHBydW5pbmdUYWJsZVBhcmFtcykge1xuICAgICAgICAgIHJlc3VsdHMucHVzaChuYW1lKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgIH0pKCk7XG4gICAgfVxuICAgIGZvciAobSA9IDAsIGxlbiA9IHRhYmxlcy5sZW5ndGg7IG0gPCBsZW47IG0rKykge1xuICAgICAgdGFibGVOYW1lID0gdGFibGVzW21dO1xuICAgICAgaWYgKHRoaXMucHJ1bmluZ1RhYmxlc1t0YWJsZU5hbWVdICE9PSBudWxsKSB7XG4gICAgICAgIC8vIEFscmVhZHkgY29tcHV0ZWRcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBwYXJhbXMgPSBwcnVuaW5nVGFibGVQYXJhbXNbdGFibGVOYW1lXTtcbiAgICAgIHRoaXMucHJ1bmluZ1RhYmxlc1t0YWJsZU5hbWVdID0gY29tcHV0ZVBydW5pbmdUYWJsZSguLi5wYXJhbXMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBDdWJlLmluaXRTb2x2ZXIgPSBmdW5jdGlvbigpIHtcbiAgICBDdWJlLmNvbXB1dGVNb3ZlVGFibGVzKCk7XG4gICAgcmV0dXJuIEN1YmUuY29tcHV0ZVBydW5pbmdUYWJsZXMoKTtcbiAgfTtcblxuICBDdWJlLnByb3RvdHlwZS5zb2x2ZVVwcmlnaHQgPSBmdW5jdGlvbihtYXhEZXB0aCA9IDIyKSB7XG4gICAgdmFyIFN0YXRlLCBmcmVlU3RhdGVzLCBtb3ZlTmFtZXMsIHBoYXNlMSwgcGhhc2Uxc2VhcmNoLCBwaGFzZTIsIHBoYXNlMnNlYXJjaCwgc29sdXRpb24sIHN0YXRlLCB4O1xuICAgIC8vIE5hbWVzIGZvciBhbGwgbW92ZXMsIGkuZS4gVSwgVTIsIFUnLCBGLCBGMiwgLi4uXG4gICAgbW92ZU5hbWVzID0gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGZhY2UsIGZhY2VOYW1lLCBtLCBvLCBwb3dlciwgcG93ZXJOYW1lLCByZXN1bHQ7XG4gICAgICBmYWNlTmFtZSA9IFsnVScsICdSJywgJ0YnLCAnRCcsICdMJywgJ0InXTtcbiAgICAgIHBvd2VyTmFtZSA9IFsnJywgJzInLCBcIidcIl07XG4gICAgICByZXN1bHQgPSBbXTtcbiAgICAgIGZvciAoZmFjZSA9IG0gPSAwOyBtIDw9IDU7IGZhY2UgPSArK20pIHtcbiAgICAgICAgZm9yIChwb3dlciA9IG8gPSAwOyBvIDw9IDI7IHBvd2VyID0gKytvKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2goZmFjZU5hbWVbZmFjZV0gKyBwb3dlck5hbWVbcG93ZXJdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9KSgpO1xuICAgIFN0YXRlID0gY2xhc3MgU3RhdGUge1xuICAgICAgY29uc3RydWN0b3IoY3ViZSkge1xuICAgICAgICB0aGlzLnBhcmVudCA9IG51bGw7XG4gICAgICAgIHRoaXMubGFzdE1vdmUgPSBudWxsO1xuICAgICAgICB0aGlzLmRlcHRoID0gMDtcbiAgICAgICAgaWYgKGN1YmUpIHtcbiAgICAgICAgICB0aGlzLmluaXQoY3ViZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaW5pdChjdWJlKSB7XG4gICAgICAgIC8vIFBoYXNlIDEgY29vcmRpbmF0ZXNcbiAgICAgICAgdGhpcy5mbGlwID0gY3ViZS5mbGlwKCk7XG4gICAgICAgIHRoaXMudHdpc3QgPSBjdWJlLnR3aXN0KCk7XG4gICAgICAgIHRoaXMuc2xpY2UgPSBjdWJlLkZSdG9CUigpIC8gTl9TTElDRTIgfCAwO1xuICAgICAgICAvLyBQaGFzZSAyIGNvb3JkaW5hdGVzXG4gICAgICAgIHRoaXMucGFyaXR5ID0gY3ViZS5jb3JuZXJQYXJpdHkoKTtcbiAgICAgICAgdGhpcy5VUkZ0b0RMRiA9IGN1YmUuVVJGdG9ETEYoKTtcbiAgICAgICAgdGhpcy5GUnRvQlIgPSBjdWJlLkZSdG9CUigpO1xuICAgICAgICAvLyBUaGVzZSBhcmUgbGF0ZXIgbWVyZ2VkIHRvIFVSdG9ERiB3aGVuIHBoYXNlIDIgYmVnaW5zXG4gICAgICAgIHRoaXMuVVJ0b1VMID0gY3ViZS5VUnRvVUwoKTtcbiAgICAgICAgdGhpcy5VQnRvREYgPSBjdWJlLlVCdG9ERigpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgc29sdXRpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudC5zb2x1dGlvbigpICsgbW92ZU5hbWVzW3RoaXMubGFzdE1vdmVdICsgJyAnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyMgSGVscGVyc1xuICAgICAgbW92ZSh0YWJsZSwgaW5kZXgsIG1vdmUpIHtcbiAgICAgICAgcmV0dXJuIEN1YmUubW92ZVRhYmxlc1t0YWJsZV1baW5kZXhdW21vdmVdO1xuICAgICAgfVxuXG4gICAgICBwcnVuaW5nKHRhYmxlLCBpbmRleCkge1xuICAgICAgICByZXR1cm4gcHJ1bmluZyhDdWJlLnBydW5pbmdUYWJsZXNbdGFibGVdLCBpbmRleCk7XG4gICAgICB9XG5cbiAgICAgIC8vIyBQaGFzZSAxXG5cbiAgICAgIC8vIFJldHVybiB0aGUgbmV4dCB2YWxpZCBwaGFzZSAxIG1vdmVzIGZvciB0aGlzIHN0YXRlXG4gICAgICBtb3ZlczEoKSB7XG4gICAgICAgIGlmICh0aGlzLmxhc3RNb3ZlICE9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIG5leHRNb3ZlczFbdGhpcy5sYXN0TW92ZSAvIDMgfCAwXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gYWxsTW92ZXMxO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIENvbXB1dGUgdGhlIG1pbmltdW0gbnVtYmVyIG9mIG1vdmVzIHRvIHRoZSBlbmQgb2YgcGhhc2UgMVxuICAgICAgbWluRGlzdDEoKSB7XG4gICAgICAgIHZhciBkMSwgZDI7XG4gICAgICAgIC8vIFRoZSBtYXhpbXVtIG51bWJlciBvZiBtb3ZlcyB0byB0aGUgZW5kIG9mIHBoYXNlIDEgd3J0LiB0aGVcbiAgICAgICAgLy8gY29tYmluYXRpb24gZmxpcCBhbmQgc2xpY2UgY29vcmRpbmF0ZXMgb25seVxuICAgICAgICBkMSA9IHRoaXMucHJ1bmluZygnc2xpY2VGbGlwJywgTl9TTElDRTEgKiB0aGlzLmZsaXAgKyB0aGlzLnNsaWNlKTtcbiAgICAgICAgLy8gVGhlIGNvbWJpbmF0aW9uIG9mIHR3aXN0IGFuZCBzbGljZSBjb29yZGluYXRlc1xuICAgICAgICBkMiA9IHRoaXMucHJ1bmluZygnc2xpY2VUd2lzdCcsIE5fU0xJQ0UxICogdGhpcy50d2lzdCArIHRoaXMuc2xpY2UpO1xuICAgICAgICAvLyBUaGUgdHJ1ZSBtaW5pbWFsIGRpc3RhbmNlIGlzIHRoZSBtYXhpbXVtIG9mIHRoZXNlIHR3b1xuICAgICAgICByZXR1cm4gbWF4KGQxLCBkMik7XG4gICAgICB9XG5cbiAgICAgIC8vIENvbXB1dGUgdGhlIG5leHQgcGhhc2UgMSBzdGF0ZSBmb3IgdGhlIGdpdmVuIG1vdmVcbiAgICAgIG5leHQxKG1vdmUpIHtcbiAgICAgICAgdmFyIG5leHQ7XG4gICAgICAgIG5leHQgPSBmcmVlU3RhdGVzLnBvcCgpO1xuICAgICAgICBuZXh0LnBhcmVudCA9IHRoaXM7XG4gICAgICAgIG5leHQubGFzdE1vdmUgPSBtb3ZlO1xuICAgICAgICBuZXh0LmRlcHRoID0gdGhpcy5kZXB0aCArIDE7XG4gICAgICAgIG5leHQuZmxpcCA9IHRoaXMubW92ZSgnZmxpcCcsIHRoaXMuZmxpcCwgbW92ZSk7XG4gICAgICAgIG5leHQudHdpc3QgPSB0aGlzLm1vdmUoJ3R3aXN0JywgdGhpcy50d2lzdCwgbW92ZSk7XG4gICAgICAgIG5leHQuc2xpY2UgPSB0aGlzLm1vdmUoJ0ZSdG9CUicsIHRoaXMuc2xpY2UgKiAyNCwgbW92ZSkgLyAyNCB8IDA7XG4gICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgfVxuXG4gICAgICAvLyMgUGhhc2UgMlxuXG4gICAgICAvLyBSZXR1cm4gdGhlIG5leHQgdmFsaWQgcGhhc2UgMiBtb3ZlcyBmb3IgdGhpcyBzdGF0ZVxuICAgICAgbW92ZXMyKCkge1xuICAgICAgICBpZiAodGhpcy5sYXN0TW92ZSAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBuZXh0TW92ZXMyW3RoaXMubGFzdE1vdmUgLyAzIHwgMF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGFsbE1vdmVzMjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBDb21wdXRlIHRoZSBtaW5pbXVtIG51bWJlciBvZiBtb3ZlcyB0byB0aGUgc29sdmVkIGN1YmVcbiAgICAgIG1pbkRpc3QyKCkge1xuICAgICAgICB2YXIgZDEsIGQyLCBpbmRleDEsIGluZGV4MjtcbiAgICAgICAgaW5kZXgxID0gKE5fU0xJQ0UyICogdGhpcy5VUnRvREYgKyB0aGlzLkZSdG9CUikgKiBOX1BBUklUWSArIHRoaXMucGFyaXR5O1xuICAgICAgICBkMSA9IHRoaXMucHJ1bmluZygnc2xpY2VVUnRvREZQYXJpdHknLCBpbmRleDEpO1xuICAgICAgICBpbmRleDIgPSAoTl9TTElDRTIgKiB0aGlzLlVSRnRvRExGICsgdGhpcy5GUnRvQlIpICogTl9QQVJJVFkgKyB0aGlzLnBhcml0eTtcbiAgICAgICAgZDIgPSB0aGlzLnBydW5pbmcoJ3NsaWNlVVJGdG9ETEZQYXJpdHknLCBpbmRleDIpO1xuICAgICAgICByZXR1cm4gbWF4KGQxLCBkMik7XG4gICAgICB9XG5cbiAgICAgIC8vIEluaXRpYWxpemUgcGhhc2UgMiBjb29yZGluYXRlc1xuICAgICAgaW5pdDIodG9wID0gdHJ1ZSkge1xuICAgICAgICBpZiAodGhpcy5wYXJlbnQgPT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gRm9yIG90aGVyIHN0YXRlcywgdGhlIHBoYXNlIDIgc3RhdGUgaXMgY29tcHV0ZWQgYmFzZWQgb25cbiAgICAgICAgLy8gcGFyZW50J3Mgc3RhdGUuXG4gICAgICAgIC8vIEFscmVhZHkgYXNzaWduZWQgZm9yIHRoZSBpbml0aWFsIHN0YXRlXG4gICAgICAgIHRoaXMucGFyZW50LmluaXQyKGZhbHNlKTtcbiAgICAgICAgdGhpcy5VUkZ0b0RMRiA9IHRoaXMubW92ZSgnVVJGdG9ETEYnLCB0aGlzLnBhcmVudC5VUkZ0b0RMRiwgdGhpcy5sYXN0TW92ZSk7XG4gICAgICAgIHRoaXMuRlJ0b0JSID0gdGhpcy5tb3ZlKCdGUnRvQlInLCB0aGlzLnBhcmVudC5GUnRvQlIsIHRoaXMubGFzdE1vdmUpO1xuICAgICAgICB0aGlzLnBhcml0eSA9IHRoaXMubW92ZSgncGFyaXR5JywgdGhpcy5wYXJlbnQucGFyaXR5LCB0aGlzLmxhc3RNb3ZlKTtcbiAgICAgICAgdGhpcy5VUnRvVUwgPSB0aGlzLm1vdmUoJ1VSdG9VTCcsIHRoaXMucGFyZW50LlVSdG9VTCwgdGhpcy5sYXN0TW92ZSk7XG4gICAgICAgIHRoaXMuVUJ0b0RGID0gdGhpcy5tb3ZlKCdVQnRvREYnLCB0aGlzLnBhcmVudC5VQnRvREYsIHRoaXMubGFzdE1vdmUpO1xuICAgICAgICBpZiAodG9wKSB7XG4gICAgICAgICAgLy8gVGhpcyBpcyB0aGUgaW5pdGlhbCBwaGFzZSAyIHN0YXRlLiBHZXQgdGhlIFVSdG9ERiBjb29yZGluYXRlXG4gICAgICAgICAgLy8gYnkgbWVyZ2luZyBVUnRvVUwgYW5kIFVCdG9ERlxuICAgICAgICAgIHJldHVybiB0aGlzLlVSdG9ERiA9IHRoaXMubW92ZSgnbWVyZ2VVUnRvREYnLCB0aGlzLlVSdG9VTCwgdGhpcy5VQnRvREYpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIENvbXB1dGUgdGhlIG5leHQgcGhhc2UgMiBzdGF0ZSBmb3IgdGhlIGdpdmVuIG1vdmVcbiAgICAgIG5leHQyKG1vdmUpIHtcbiAgICAgICAgdmFyIG5leHQ7XG4gICAgICAgIG5leHQgPSBmcmVlU3RhdGVzLnBvcCgpO1xuICAgICAgICBuZXh0LnBhcmVudCA9IHRoaXM7XG4gICAgICAgIG5leHQubGFzdE1vdmUgPSBtb3ZlO1xuICAgICAgICBuZXh0LmRlcHRoID0gdGhpcy5kZXB0aCArIDE7XG4gICAgICAgIG5leHQuVVJGdG9ETEYgPSB0aGlzLm1vdmUoJ1VSRnRvRExGJywgdGhpcy5VUkZ0b0RMRiwgbW92ZSk7XG4gICAgICAgIG5leHQuRlJ0b0JSID0gdGhpcy5tb3ZlKCdGUnRvQlInLCB0aGlzLkZSdG9CUiwgbW92ZSk7XG4gICAgICAgIG5leHQucGFyaXR5ID0gdGhpcy5tb3ZlKCdwYXJpdHknLCB0aGlzLnBhcml0eSwgbW92ZSk7XG4gICAgICAgIG5leHQuVVJ0b0RGID0gdGhpcy5tb3ZlKCdVUnRvREYnLCB0aGlzLlVSdG9ERiwgbW92ZSk7XG4gICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgfVxuXG4gICAgfTtcbiAgICBzb2x1dGlvbiA9IG51bGw7XG4gICAgcGhhc2Uxc2VhcmNoID0gZnVuY3Rpb24oc3RhdGUpIHtcbiAgICAgIHZhciBkZXB0aCwgbSwgcmVmLCByZXN1bHRzO1xuICAgICAgZGVwdGggPSAwO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChkZXB0aCA9IG0gPSAxLCByZWYgPSBtYXhEZXB0aDsgKDEgPD0gcmVmID8gbSA8PSByZWYgOiBtID49IHJlZik7IGRlcHRoID0gMSA8PSByZWYgPyArK20gOiAtLW0pIHtcbiAgICAgICAgcGhhc2UxKHN0YXRlLCBkZXB0aCk7XG4gICAgICAgIGlmIChzb2x1dGlvbiAhPT0gbnVsbCkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdHMucHVzaChkZXB0aCsrKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH07XG4gICAgcGhhc2UxID0gZnVuY3Rpb24oc3RhdGUsIGRlcHRoKSB7XG4gICAgICB2YXIgbGVuLCBtLCBtb3ZlLCBuZXh0LCByZWYsIHJlZjEsIHJlc3VsdHM7XG4gICAgICBpZiAoZGVwdGggPT09IDApIHtcbiAgICAgICAgaWYgKHN0YXRlLm1pbkRpc3QxKCkgPT09IDApIHtcbiAgICAgICAgICAvLyBNYWtlIHN1cmUgd2UgZG9uJ3Qgc3RhcnQgcGhhc2UgMiB3aXRoIGEgcGhhc2UgMiBtb3ZlIGFzIHRoZVxuICAgICAgICAgIC8vIGxhc3QgbW92ZSBpbiBwaGFzZSAxLCBiZWNhdXNlIHBoYXNlIDIgd291bGQgdGhlbiByZXBlYXQgdGhlXG4gICAgICAgICAgLy8gc2FtZSBtb3ZlLlxuICAgICAgICAgIGlmIChzdGF0ZS5sYXN0TW92ZSA9PT0gbnVsbCB8fCAocmVmID0gc3RhdGUubGFzdE1vdmUsIGluZGV4T2YuY2FsbChhbGxNb3ZlczIsIHJlZikgPCAwKSkge1xuICAgICAgICAgICAgcmV0dXJuIHBoYXNlMnNlYXJjaChzdGF0ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGRlcHRoID4gMCkge1xuICAgICAgICBpZiAoc3RhdGUubWluRGlzdDEoKSA8PSBkZXB0aCkge1xuICAgICAgICAgIHJlZjEgPSBzdGF0ZS5tb3ZlczEoKTtcbiAgICAgICAgICByZXN1bHRzID0gW107XG4gICAgICAgICAgZm9yIChtID0gMCwgbGVuID0gcmVmMS5sZW5ndGg7IG0gPCBsZW47IG0rKykge1xuICAgICAgICAgICAgbW92ZSA9IHJlZjFbbV07XG4gICAgICAgICAgICBuZXh0ID0gc3RhdGUubmV4dDEobW92ZSk7XG4gICAgICAgICAgICBwaGFzZTEobmV4dCwgZGVwdGggLSAxKTtcbiAgICAgICAgICAgIGZyZWVTdGF0ZXMucHVzaChuZXh0KTtcbiAgICAgICAgICAgIGlmIChzb2x1dGlvbiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJlc3VsdHMucHVzaCh2b2lkIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgcGhhc2Uyc2VhcmNoID0gZnVuY3Rpb24oc3RhdGUpIHtcbiAgICAgIHZhciBkZXB0aCwgbSwgcmVmLCByZXN1bHRzO1xuICAgICAgLy8gSW5pdGlhbGl6ZSBwaGFzZSAyIGNvb3JkaW5hdGVzXG4gICAgICBzdGF0ZS5pbml0MigpO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChkZXB0aCA9IG0gPSAxLCByZWYgPSBtYXhEZXB0aCAtIHN0YXRlLmRlcHRoOyAoMSA8PSByZWYgPyBtIDw9IHJlZiA6IG0gPj0gcmVmKTsgZGVwdGggPSAxIDw9IHJlZiA/ICsrbSA6IC0tbSkge1xuICAgICAgICBwaGFzZTIoc3RhdGUsIGRlcHRoKTtcbiAgICAgICAgaWYgKHNvbHV0aW9uICE9PSBudWxsKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0cy5wdXNoKGRlcHRoKyspO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfTtcbiAgICBwaGFzZTIgPSBmdW5jdGlvbihzdGF0ZSwgZGVwdGgpIHtcbiAgICAgIHZhciBsZW4sIG0sIG1vdmUsIG5leHQsIHJlZiwgcmVzdWx0cztcbiAgICAgIGlmIChkZXB0aCA9PT0gMCkge1xuICAgICAgICBpZiAoc3RhdGUubWluRGlzdDIoKSA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBzb2x1dGlvbiA9IHN0YXRlLnNvbHV0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZGVwdGggPiAwKSB7XG4gICAgICAgIGlmIChzdGF0ZS5taW5EaXN0MigpIDw9IGRlcHRoKSB7XG4gICAgICAgICAgcmVmID0gc3RhdGUubW92ZXMyKCk7XG4gICAgICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgICAgIGZvciAobSA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IG0gPCBsZW47IG0rKykge1xuICAgICAgICAgICAgbW92ZSA9IHJlZlttXTtcbiAgICAgICAgICAgIG5leHQgPSBzdGF0ZS5uZXh0Mihtb3ZlKTtcbiAgICAgICAgICAgIHBoYXNlMihuZXh0LCBkZXB0aCAtIDEpO1xuICAgICAgICAgICAgZnJlZVN0YXRlcy5wdXNoKG5leHQpO1xuICAgICAgICAgICAgaWYgKHNvbHV0aW9uICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHZvaWQgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICBmcmVlU3RhdGVzID0gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG0sIHJlZiwgcmVzdWx0cztcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoeCA9IG0gPSAwLCByZWYgPSBtYXhEZXB0aCArIDE7ICgwIDw9IHJlZiA/IG0gPD0gcmVmIDogbSA+PSByZWYpOyB4ID0gMCA8PSByZWYgPyArK20gOiAtLW0pIHtcbiAgICAgICAgcmVzdWx0cy5wdXNoKG5ldyBTdGF0ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9KSgpO1xuICAgIHN0YXRlID0gZnJlZVN0YXRlcy5wb3AoKS5pbml0KHRoaXMpO1xuICAgIHBoYXNlMXNlYXJjaChzdGF0ZSk7XG4gICAgZnJlZVN0YXRlcy5wdXNoKHN0YXRlKTtcbiAgICAvLyBUcmltIHRoZSB0cmFpbGluZyBzcGFjZVxuICAgIGlmIChzb2x1dGlvbi5sZW5ndGggPiAwKSB7XG4gICAgICBzb2x1dGlvbiA9IHNvbHV0aW9uLnN1YnN0cmluZygwLCBzb2x1dGlvbi5sZW5ndGggLSAxKTtcbiAgICB9XG4gICAgcmV0dXJuIHNvbHV0aW9uO1xuICB9O1xuXG4gIGZhY2VOdW1zID0ge1xuICAgIFU6IDAsXG4gICAgUjogMSxcbiAgICBGOiAyLFxuICAgIEQ6IDMsXG4gICAgTDogNCxcbiAgICBCOiA1XG4gIH07XG5cbiAgZmFjZU5hbWVzID0ge1xuICAgIDA6ICdVJyxcbiAgICAxOiAnUicsXG4gICAgMjogJ0YnLFxuICAgIDM6ICdEJyxcbiAgICA0OiAnTCcsXG4gICAgNTogJ0InXG4gIH07XG5cbiAgQ3ViZS5wcm90b3R5cGUuc29sdmUgPSBmdW5jdGlvbihtYXhEZXB0aCA9IDIyKSB7XG4gICAgdmFyIGNsb25lLCBsZW4sIG0sIG1vdmUsIHJlZiwgcm90YXRpb24sIHNvbHV0aW9uLCB1cHJpZ2h0LCB1cHJpZ2h0U29sdXRpb247XG4gICAgY2xvbmUgPSB0aGlzLmNsb25lKCk7XG4gICAgdXByaWdodCA9IGNsb25lLnVwcmlnaHQoKTtcbiAgICBjbG9uZS5tb3ZlKHVwcmlnaHQpO1xuICAgIHJvdGF0aW9uID0gbmV3IEN1YmUoKS5tb3ZlKHVwcmlnaHQpLmNlbnRlcjtcbiAgICB1cHJpZ2h0U29sdXRpb24gPSBjbG9uZS5zb2x2ZVVwcmlnaHQobWF4RGVwdGgpO1xuICAgIHNvbHV0aW9uID0gW107XG4gICAgcmVmID0gdXByaWdodFNvbHV0aW9uLnNwbGl0KCcgJyk7XG4gICAgZm9yIChtID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgbSA8IGxlbjsgbSsrKSB7XG4gICAgICBtb3ZlID0gcmVmW21dO1xuICAgICAgc29sdXRpb24ucHVzaChmYWNlTmFtZXNbcm90YXRpb25bZmFjZU51bXNbbW92ZVswXV1dXSk7XG4gICAgICBpZiAobW92ZS5sZW5ndGggPiAxKSB7XG4gICAgICAgIHNvbHV0aW9uW3NvbHV0aW9uLmxlbmd0aCAtIDFdICs9IG1vdmVbMV07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzb2x1dGlvbi5qb2luKCcgJyk7XG4gIH07XG5cbiAgQ3ViZS5zY3JhbWJsZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBDdWJlLmludmVyc2UoQ3ViZS5yYW5kb20oKS5zb2x2ZSgpKTtcbiAgfTtcblxufSkuY2FsbCh0aGlzKTtcbiIsImV4cG9ydCBjb25zdCBDdWJlID0gcmVxdWlyZSgnY3ViZWpzJyk7XG5DdWJlLmluaXRTb2x2ZXIoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==