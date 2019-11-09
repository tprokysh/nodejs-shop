const $card = document.querySelector("#card");
console.log($card);

if ($card) {
  $card.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn")) {
      const id = event.target.dataset.id;
      console.log(id);

      fetch("/card/delete/" + id, {
        method: "delete"
      })
        .then((res) => res.json())
        .then((card) => {
          if (card.games.length) {
            const html = card.games
              .map((r) => {
                return `
                  <tr>
                    <td>${r.title}</td>
                    <td>${r.count}</td>
                    <td>${r.price}</td>
                    <td><button class="btn btn-small" data-id="${r.id}">Delete</button></td>
                  </tr>`;
              })
              .join("");
            console.log(card.price);

            $card.querySelector("tbody").innerHTML = html;
            $card.querySelector(".price").textContent = card.price;
          } else {
            $card.innerHTML = "<p>Card empty</p>";
          }
        });
    }
  });
}
