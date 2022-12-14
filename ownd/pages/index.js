import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// import { ethers } from "ethers";

export default function Home() {

  const [name, setName] = useState("");
  const [collections, setCollections] = useState({});
  const [prices, setPrices] = useState([]);
  
  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const getCollections = async (name) => {
    fetch(`https://api.reservoir.tools/collections/v5?name=${name}`)
        .then(response => response.json())
        .then(data => setCollections(data.collections))
  }

/*   const getPrices = async (address) => {
    fetch(`https://api.reservoir.tools/orders/asks/v3?token=${address}&sortBy=price&limit=1`)
      .then(response => response.json())
      .then(data => console.log(data[0]))
  } */

  const renderCollections = () => {
    if (collections.length > 0) {
      return (
        <div>
          <div>
            <a href={collections[0].externalUrl}><img src={collections[0].image} width="200" height="200"/></a>
            <div><a href={collections[0].externalUrl}>{collections[0].name}</a></div>
            <div>${collections[0].floorAsk.price.amount.usd} USD</div>
            <div>{collections[0].floorAsk.price.amount.raw/10e17} ETH</div>
          </div>
          <div>
            <a href={collections[1].externalUrl}><img src={collections[1].image} width="200" height="200"/></a>
            <div><a href={collections[1].externalUrl}>{collections[1].name}</a></div>
            <div>${collections[1].floorAsk.price.amount.usd} USD</div>
            <div>{collections[1].floorAsk.price.amount.raw/10e17} ETH</div>
          </div>
      </div>
      )
    }
  }

  if (name.length > 0) {
    getCollections(name);
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>OWND</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          OWND
        </h1>

        <input 
          type="text" 
          placeholder="Search.." 
          value={name}
          onChange={handleChange}
        />
        {renderCollections()}

      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
