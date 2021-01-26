(() => {
  let clicked = false;
  let board = [
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"],
  ];
  let existWin = false;
  let win = {
    name: "",
    val: "",
    pos: "",
  };

  addStylesToHead();
  init();

  function addStylesToHead() {
    var cssId = "tateti"; // you could encode the css path itself to generate id..
    if (!document.getElementById(cssId)) {
      var head = document.getElementsByTagName("head")[0];
      var link = document.createElement("link");
      link.id = cssId;
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = "../src//index.css";
      // link.media = "all";
      head.appendChild(link);
    }
  }

  function init() {
    const containerFragment = document.createDocumentFragment();

    const $divContainer = document.createElement("div");
    $divContainer.className = "tateti__container";

    const tittle = createTittle("TA-TE-TI");
    const table = createTatetiTable();

    $divContainer.appendChild(tittle);
    $divContainer.appendChild(table);

    containerFragment.appendChild($divContainer);

    document.body.appendChild(containerFragment);
  }

  function createTittle(textTittle) {
    const tittleFragment = document.createDocumentFragment();

    const $h1 = document.createElement("h1");
    $h1.textContent = textTittle;

    tittleFragment.appendChild($h1);

    return tittleFragment;
  }

  function createTatetiTable() {
    function validateBoard() {
      const validateRow = (row, val) => {
        return (
          val !== "-" &&
          board[row][0] === val &&
          board[row][1] === val &&
          board[row][2] === val
        );
      };
      const validateCol = (col, val) => {
        return (
          val !== "-" &&
          board[0][col] === val &&
          board[1][col] === val &&
          board[2][col] === val
        );
      };
      const validateDiag = (row, val) => {
        if (val !== "-" && row === 0)
          return (
            (board[row][0] === val &&
              board[row + 1][1] === val &&
              board[row + 2][2] === val) ||
            (board[row][2] === val &&
              board[row + 1][1] === val &&
              board[row + 2][0] === val)
          );

        return false;
      };
      const setWin = (val, pos) => {
        win.name = val;
        win.val = val;
        win.pos = pos;
        existWin = true;
      };

      for (let i = 0; i < 3; i++)
        if (validateRow(i, board[i][0])) setWin(board[i][0], "horizontal");
        else if (validateCol(i, board[0][i])) setWin(board[0][i], "vertical");
        else if (validateDiag(i, board[1][1])) setWin(board[1][1], "diagonal");
    }

    function clickTd(evt) {
      let el = evt.target;
      if (el.innerHTML === "" && !existWin) {
        clicked = !clicked;

        const coord = el.getAttribute("data-coord");
        const col = coord.split(",")[0];
        const row = coord.split(",")[1];
        let value = "";

        value = clicked ? "X" : "O";
        el.innerHTML = value;
        board[col][row] = value;

        validateBoard();
        if (existWin) {
          const messageFragment = document.createDocumentFragment();

          const $div = document.createElement("div");
          const $p = document.createElement("p");
          const $btnReset = document.createElement("button");

          $btnReset.innerText = "Play again!";
          $btnReset.className = "button";
          $btnReset.addEventListener("click", () => {
            window.location.reload();
          });
          $p.innerText = `You are a winner ${win.name}`;

          $div.appendChild($p);
          $div.appendChild($btnReset);
          $div.className = "message__container";

          messageFragment.appendChild($div);

          document.body.appendChild(messageFragment);
        }
      }
    }

    const tableFragment = document.createDocumentFragment();

    const $table = document.createElement("table");
    $table.className = "tateti__table";

    const $tbody = document.createElement("tbody");
    $table.appendChild($tbody);

    for (let tr = 0; tr < 3; tr++) {
      const $tr = document.createElement("tr");
      for (let td = 0; td < 3; td++) {
        const $td = document.createElement("td");
        $td.setAttribute("data-coord", [tr, td].join(","));
        $td.addEventListener("click", clickTd);
        $tr.appendChild($td);
      }
      $tbody.appendChild($tr);
    }

    tableFragment.appendChild($table);

    return tableFragment;
  }
})();
