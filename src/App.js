import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [products, setproducts] = useState([]);
  const [noOfPage, setNosOfPage] = useState(0);
  const [selectedPage, setSelectedPage] = useState(1);


  const fetchData = async () => {
    const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${(selectedPage - 1) * 10}&select=title,price`)
    const productResDetails = await response.json()
    setproducts(productResDetails.products)
    if (productResDetails && productResDetails.total) {
      const noOfPage = productResDetails.total / 10
      setNosOfPage(noOfPage)
    }
  }

  const pageNumberClickHandler = (pageNo) => {
    setSelectedPage(pageNo);
  }
  useEffect(() => {
    fetchData()
  }, [selectedPage])

  return (
    <div className="App">
      <div>
        <h1>Pagination Impelmentaion</h1>
      </div>
      <div>
        {products && products.map((product) => {
          return <div className='product' key={product.title}>{product.title}</div>
        })}
      </div>
      <div style={{ marginTop: '20px' }}>
        <span hidden={selectedPage === 1} onClick={() => {
          setSelectedPage(selectedPage - 1)
        }}>Previous</span>
        {[...Array(noOfPage)].map((data, index) => {
          return <button className={'pagenumber'} key={index} onClick={() => {
            pageNumberClickHandler(index + 1)
          }}><span className={index + 1 === selectedPage ? 'selectedpage' : ''}>{index + 1}</span></button>
        })
        }
        <span hidden={selectedPage === noOfPage} onClick={() => {
          setSelectedPage(selectedPage + 1)
        }}>Next</span>
      </div>
    </div>
  );
}

export default App;
