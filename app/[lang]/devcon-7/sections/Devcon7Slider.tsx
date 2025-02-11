'use client'

import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Image from 'next/image'

export const Devcon7Slider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4.2,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5.4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4.2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  }

  const images = [
    '/images/devcon-7/devcon-7-overview-1.jpg',
    '/images/devcon-7/devcon-7-overview-2.jpg',
    '/images/devcon-7/devcon-7-overview-3.jpg',
    '/images/devcon-7/devcon-7-overview-4.jpg',
    '/images/devcon-7/devcon-7-overview-5.jpg',
    '/images/devcon-7/devcon-7-overview-6.jpg',
  ]

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div
          key={index}
          className="relative h-[320px] w-full bg-cover bg-center overflow-hidden"
          style={{ backgroundImage: `url(${image})` }}
        >
          <Image
            src={image}
            alt={`Devcon 7 Overview ${index + 1}`}
            fill
            className="object-cover w-full"
          />
        </div>
      ))}
    </Slider>
  )
}
