import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import Degrees from '../../components/Degrees/Degrees'
import Welcome from '../../components/Welcome/Welcome'
import Info from '../../components/Info/Info'
import Catalog from '../../components/Catalog/Catalog'
import HowToGet from '../../components/HowToGet/HowToGet'
import BecomeSupplier from '../../components/BecomeSupplier/BecomeSupplier'
import FAQ from '../../components/FAQ/FAQ'
import Footer from '../../components/Footer/Footer'
import DetailedProductModal from '../../components/modals/detailed-product/detailed-product'
import RulesModal from '../../components/modals/rules-modal/rules-modal'

const Home = () => {
  const [isModalOpened, setIsModalOpened] = useState(null)
  const [isRulesModalOpened, setIsRulesModalOpened] = useState(false)

  return (
    <div>
      <DetailedProductModal setIsRulesModalOpened={setIsRulesModalOpened} isModalOpened={isModalOpened} setIsModalOpened={setIsModalOpened} />
      <RulesModal isModalOpened={isRulesModalOpened} setIsModalOpened={setIsRulesModalOpened} />
      <Header setIsRulesModalOpened={setIsRulesModalOpened} />
      <Degrees />
      <Welcome />
      <Degrees lessMargin={true}/>
      <Info setIsRulesModalOpened={setIsRulesModalOpened} />
      <Catalog setIsModalOpened={setIsModalOpened} />
      <HowToGet setIsRulesModalOpened={setIsRulesModalOpened} />
      <BecomeSupplier />
      <FAQ />
      <Footer setIsRulesModalOpened={setIsRulesModalOpened} />
    </div>
  )
}

export default Home
