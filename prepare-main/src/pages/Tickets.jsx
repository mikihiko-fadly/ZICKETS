import { useState, useEffect, useContext } from "react";
import { Trash, SquarePen, PlusCircle, Search } from "lucide-react";
import { KrjContext } from "../App";
import Cookies from 'js-cookie'; 

export default function Tickets() {
  const { keranjang, setKeranjang } = useContext(KrjContext);
  const [producttts, setproducttts] = useState([]);
  const [updateproducttt, setUpdateproducttt] = useState(null);
  const [newproducttt, setNewproducttt] = useState(null);
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");

  // Ambil token dari cookies
  const token = Cookies.get('token');

  console.log(token)

  useEffect(() => {
    fetchProducts();
  }, []); // Hanya dipanggil sekali saat komponen pertama kali dimuat

  function fetchProducts() {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/tickets`, {
      headers: { "Authorization": `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal mengambil data produk, status: " + response.status);
        }
        return response.json();
      })
      .then((products) => setproducttts(products))
      .catch((error) => {
        console.error("Error fetching products:", error.message);
        alert("Terjadi masalah saat mengambil data produk. Silakan coba lagi.");
      });
  }

  function handleDelete(product) {
    if (confirm("Apakah anda yakin akan menghapus produk ini?")) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/api/tickets/${product.id}`, {
        method: "DELETE",
        headers:{
          "Authorization": `Bearer ${token}`,
        }
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Gagal menghapus produk");
          }
          return response.text();
        })
        .then(() => {
          setproducttts((prevProducttts) =>
            prevProducttts.filter((p) => p.id !== product.id)
          );
          alert("Produk berhasil dihapus");
        })
        .catch((error) => {
          console.error("Error deleting product:", error.message);
          alert("Gagal menghapus produk. Silakan coba lagi.");
        });
    }
  }

  function saveUpdate() {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/tickets/${updateproducttt.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(updateproducttt),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal memperbarui produk");
        }
        return response.json();
      })
      .then((updatedProduct) => {
        setproducttts((prevProducttts) =>
          prevProducttts.map((p) =>
            p.id === updatedProduct.id ? updatedProduct : p
          )
        );
        alert("Produk berhasil diperbarui");
      })
      // .catch((error) => {
      //   console.error("Error updating product:", error.message);
      //   alert("Gagal memperbarui produk. Silakan coba lagi.");
      // });
    setUpdateproducttt(null);
  }

  function handleAddNewproducttt() {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/tickets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(newproducttt),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal menambahkan produk");
        }
        return response.json();
      })
      .then((addedProduct) => {
        setproducttts((prevProducttts) => [...prevProducttts, addedProduct]);
        alert("Produk berhasil ditambahkan");
      })
      .catch((error) => {
        console.error("Error adding product:", error.message);
        alert("Gagal menambahkan produk. Silakan coba lagi.");
      });
    setNewproducttt(null);
  }

  const filterData = producttts
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortBy] < b[sortBy] ? -1 : 1;
      } else {
        return a[sortBy] > b[sortBy] ? -1 : 1;
      }
    })
    .filter((item) => {
      return (
        item.name && item.name.toLowerCase().includes(search.toLowerCase())
      );
    });

  return (
    <div>
      {/* Header Section */}
      <div className="flex items-center mt-1 w-full p-3 gap-2">
        <button
          onClick={() => setNewproducttt({ name: "", price: "", imageurl: "" })}
          className="flex w-1/5 justify-center gap-2 p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-purple-500 hover:to-blue-500 shadow-lg"
        >
          <PlusCircle /> Add
        </button>
        <div className="flex items-center gap-1 w-1/5">
          <Search />
          <input
            type="text"
            className="bg-gray-100 w-full p-4 gap-2 rounded-xl border-2 border-blue-500 focus:border-blue-700 focus:outline-none shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
          />
        </div>
        <label className="flex w-1/5 gap-2 items-center">
          <h1 className="text-gray-600">Sort By</h1>
          <select
            className="rounded-lg border-2 border-blue-500 bg-white h-9 text-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="id">Normal</option>
            <option value="name">Name</option>
          </select>
        </label>
        <label className="flex items-center gap-2 w-1/5">
          <h1 className="text-gray-600">Order</h1>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="h-9 p-2 text-sm rounded-lg border-2 border-blue-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>

      {/* Produk Section */}
      <div className="flex flex-col justify-center items-center gap-4">
        {/* Menggunakan Grid untuk Tata Letak Produk */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filterData.map((producttt) => (
            <div
              key={producttt.id}
              className="flex flex-col gap-1 bg-slate-50 w-60 justify-center items-center shadow-lg rounded-lg border-2 border-blue-500"
            >
              <img
                src={producttt.imageurl}
                alt={producttt.name}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="p-3 text-center">
                <p className="text-lg font-semibold text-gray-800">{producttt.name}</p>
                <p className="text-sm text-gray-600">${producttt.price}</p>
              </div>
              <div className="flex gap-2 p-2">
                <button
                  onClick={() => handleDelete(producttt)}
                  className="bg-gradient-to-r from-red-400 to-pink-500 text-white p-2 rounded-md hover:from-pink-500 hover:to-red-400 shadow-sm"
                >
                  <Trash />
                </button>
                <button
                  onClick={() => {
                    setUpdateproducttt(producttt);
                    console.log(producttt);
                  }}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-2 rounded-md hover:from-orange-500 hover:to-yellow-400 shadow-sm"
                >
                  <SquarePen />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conditional Rendering for Add/Edit Product Modal */}
      {(newproducttt || updateproducttt) && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">
              {newproducttt ? "Add Product" : "Edit Product"}
            </h2>
            <input
              type="text"
              placeholder="Name"
              className="w-full mb-2 p-2 border rounded"
              value={newproducttt ? newproducttt.name : updateproducttt.name}
              onChange={(e) =>
                newproducttt
                  ? setNewproducttt({
                      ...newproducttt,
                      name: e.target.value,
                    })
                  : setUpdateproducttt({
                      ...updateproducttt,
                      name: e.target.value,
                    })
              }
            />
            <input
              type="number"
              placeholder="Price"
              className="w-full mb-2 p-2 border rounded"
              value={newproducttt ? newproducttt.price : updateproducttt.price}
              onChange={(e) =>
                newproducttt
                  ? setNewproducttt({
                      ...newproducttt,
                      price: e.target.value,
                    })
                  : setUpdateproducttt({
                      ...updateproducttt,
                      price: e.target.value,
                    })
              }
            />
            <input
              type="text"
              placeholder="Image URL"
              className="w-full mb-2 p-2 border rounded"
              value={newproducttt ? newproducttt.imageurl : updateproducttt.imageurl}
              onChange={(e) =>
                newproducttt
                  ? setNewproducttt({
                      ...newproducttt,
                      imageurl: e.target.value,
                    })
                  : setUpdateproducttt({
                      ...updateproducttt,
                      imageurl: e.target.value,
                    })
              }
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={() =>
                  newproducttt ? handleAddNewproducttt() : saveUpdate()
                }
                className="bg-blue-500 text-white p-2 rounded mr-2"
              >
                {newproducttt ? "Add Product" : "Save Changes"}
              </button>
              <button
                onClick={() =>
                  newproducttt ? setNewproducttt(null) : setUpdateproducttt(null)
                }
                className="bg-gray-500 text-white p-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
