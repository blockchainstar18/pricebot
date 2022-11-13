import React from 'react';
import logo from '../../assets/img/logo.svg';
import sha256 from 'sha256'
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';
import { useState, useEffect } from 'react';



const Popup = () => {


  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState()
  const [cdkeys, setCDKEYS] = useState([])
  const [g2a, setG2A] = useState([])
  function start() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { message: 'start' });
    });
    // var email = 'blockchainstar18@gmail.com'
    // var clientId = 'ibHtsEljmCxjOFAn'
    // var clientSecret = 'HrsPmuOlWjqBMHnQWIgfchUqBTBYcRph'

    // var string = clientId + email + clientSecret
    // const apikey = sha256(string)
    // alert(apikey)



  }


  function checkPrice() {
    const encodedtitle = encodeURI(title)
    fetch('https://muvyib7tey-1.algolianet.com/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(3.35.1)%3B%20Browser%3B%20instantsearch.js%20(4.15.0)%3B%20Magento2%20integration%20(3.2.0)%3B%20JS%20Helper%20(3.4.4)&x-algolia-application-id=MUVYIB7TEY&x-algolia-api-key=ODNjY2VjZjExZGE2NTg3ZDkyMGQ4MjljYzYwM2U0NmRjYWI4MDgwNTQ0NjgzNmE2ZGQyY2ZmMDlkMzAyYTI4NXRhZ0ZpbHRlcnM9',
      {
        method: 'POST',
        body: `{"requests":[{"indexName":"magento2_default_products","params":"highlightPreTag=__ais-highlight__&highlightPostTag=__%2Fais-highlight__&page=0&ruleContexts=%5B%22magento_filters%22%5D&hitsPerPage=24&clickAnalytics=true&query=${encodedtitle}&maxValuesPerFacet=10&facets=%5B%22restricted_countries%22%2C%22platforms%22%2C%22region%22%2C%22language%22%2C%22genres%22%2C%22price.GBP.default%22%5D&tagFilters=&facetFilters=%5B%22restricted_countries%3A-RU%22%5D&numericFilters=%5B%22visibility_search%3D1%22%5D"}]}`
      }).then((res) => {
        res.json().then((res) => {
          console.log(res.results[0].hits)
          setCDKEYS(res.results[0].hits)
        })
      })
    fetch(`https://www.g2a.com/search/api/v3/suggestions?include[]=categories&itemsPerPage=4&phrase=${encodedtitle}&currency=USD`)
      .then((res) => {
        res.json().then((res) => {
          console.log(res)
          setG2A(res.data.items)
        })
      })
  }

  return (
    <div>
      <div className='Icon'>
        <a href="https://cdkeys.com"
          target="_blank">
          <img src={logo} width={150} style={{ "cursor": "pointer" }} alt="CDKEYS.COM" /></a>
        <div style={{ "fontSize": "25px", "marginLeft": "10px", "marginRight": "10px" }}>to</div>
        <img src="https://www.g2a.com/static/assets/images/logo_g2a_white.svg"
          width={100}
          alt="G2A.COM"></img>
      </div>
      <div className='row'></div>
      <div className='pricecheck' onClick={() => {
        setVisible(!visible)
      }}>Set product to check</div>
      <div className='row'></div>
      {
        visible ? (<div className='inputtitle'>
          <input onChange={(e) => setTitle(e.target.value)} placeholder='Title of product'></input>
          <button onClick={() => checkPrice()}>Ok</button>
        </div>) : (<div></div>)
      }
      {
        cdkeys.length > 0 ? (<div className='products'>
          <div className='cdkey'>
            <div className='subtitle'>CDKEY</div>
            {
              cdkeys.map((item) => {
                return (<div className='product'>
                  <img src={item.image_url} width={50} height={70}></img>
                  <div className='info'>
                    <div className='txtprice'>{item.price.USD.default_formated}</div>
                    <div className='txt'>{item.name}</div>
                  </div>
                </div>)

              })
            }
          </div>
          <div className='g2a'>
            <div className='subtitle'>G2A</div>
            {
              g2a.map((item) => {
                return (<div className='product'>
                  <img src={item.image.sources[0].url} width={50} height={70}></img>
                  <div className='info'>
                    <div className='txtprice'>{item.price}</div>
                    <div className='txt'>{item.name}</div>
                  </div>
                </div>)

              })
            }
          </div>
        </div>) : (<div></div>)
      }



    </div>
  );
};

export default Popup;
