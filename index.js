let container = document.querySelector(".container");
        let searchInput = document.querySelector(".search-input");

        searchInput.addEventListener("input", () => {
            let data = JSON.parse(localStorage.getItem("data")) || [];
            let query = searchInput.value.toLowerCase();
            if (data.length === 0) {
                alert("No Data Available");
            } else {
                let filteredData = data.filter(obj =>
                    obj.title.toLowerCase().includes(query) ||
                    obj.category.toLowerCase().includes(query)
                );
                displayData(filteredData);
            }
        });

        async function getData() {
            try {
                let response = await fetch("https://fakestoreapi.com/products");
                let data = await response.json();
                localStorage.setItem("data", JSON.stringify(data));
                displayData(data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        }

        function displayData(data) {
            container.innerHTML = "";
            if (data.length === 0) {
                container.innerHTML = "<p>No results found</p>";
            } else {
                data.slice(0, 20).forEach(obj => { 
                    let div = document.createElement("div");
                    div.className = "item";
                    div.innerHTML = `
                        <p><b>ID:</b> ${obj.id}</p>
                        <p><b>Title:</b> ${obj.title}</p>
                        <p><b>Price:</b> $${obj.price}</p>
                        <p><b>Description:</b> ${obj.description}</p>
                        <p><b>Category:</b> ${obj.category}</p>
                        <img src="${obj.image}" alt="${obj.title}">
                    `;
                    container.appendChild(div);
                });
            }
        }
        getData();