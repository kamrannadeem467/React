import React, { useState } from 'react';
import Card from './Card';
import furnitureData from './data.json';
// import {firstImage} from "../../../public/img/sofa3.jpeg";

function Furniture() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  // Define the categories based on your data
  const categories = [
    { label: "Sofas", value: "Sofas" },
    { label: "Couches", value: "Couches" },
    { label: "Tables", value: "Tables" },
    { label: "Recliners", value: "Recliners" },
    { label: "Beds", value: "Beds" },
    { label: "Mattresses", value: "Mattresses" },
    { label: "Cabinets", value: "Cabinets" },
    { label: "Shelves", value: "Shelves" },
    { label: "Dressers", value: "Dressers" }
  ];

  // Filter and sort furniture data based on the state
  const filteredData = furnitureData
    .filter(item => item.type === "Furnitures") // Only include items of type "Furnitures"
    .filter(item => {
      return (
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === '' || item.title.includes(selectedCategory))
      );
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
      } else {
        return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
      }
    });

  return (
    <>
      <div className="container-lg my-5 bg-light">
        <div className="row">
          <div className="col-12">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item active"><a className='fs-6' href="">Home</a></li>
                <li className="breadcrumb-item active"><a className='fs-6' href="">Products</a></li>
                <li className="breadcrumb-item active" aria-current="page">Furniture</li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-lg-3 d-flex gap-3" style={{height:"20%"}}>
            <h3 className='ps-md-3'>Sorting</h3>
            <select onChange={(e) => setSortOrder(e.target.value)}>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>
          <div className="col-md-4 col-lg-5 d-lg-flex gap-3 mb-3">
            <h3>Categories</h3>
            <select onChange={(e) => setSelectedCategory(e.target.value)} className='w-75 py-1'>
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.value} value={category.value}>{category.label}</option>
              ))}
            </select>
          </div>
          <div className="col-md-4 col-sm-12 mb-3">
            <input 
              className='w-100 p-1' 
              type="text" 
              placeholder='Search' 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="container-fluid justify-content-center gap-3 d-flex flex-wrap">
        {filteredData.map((FurnitureItems) => (
          <Card
            key={FurnitureItems.id}
            id={FurnitureItems.id}
            title={FurnitureItems.title}
            brand={FurnitureItems.brand}
            desc={FurnitureItems.description}
            price={FurnitureItems.price}
            image={FurnitureItems.image}
          />
        ))}
      </div>
    </>
  );
}

export default Furniture;
