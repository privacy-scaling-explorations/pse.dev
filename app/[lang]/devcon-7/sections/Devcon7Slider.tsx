"use client"

import React, { useEffect, useState } from "react"
import Slider from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Image from "next/image"

const AnySlider = Slider as any

export const Devcon7Slider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4.2,
    slidesToScroll: 1,
    autoplay: false,
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
    appendDots: (dots: React.ReactNode) => (
      <div
        style={{
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i: number) => <div className="h-4 w-4 rounded-full  mt-5" />,
  }

  const images = [
    "/images/devcon-7/devcon-7-overview-1.jpg",
    "/images/devcon-7/devcon-7-overview-2.jpg",
    "/images/devcon-7/devcon-7-overview-3.jpg",
    "/images/devcon-7/devcon-7-overview-4.jpg",
    "/images/devcon-7/devcon-7-overview-5.jpg",
    "/images/devcon-7/devcon-7-overview-6.jpg",
  ]

  return (
    <AnySlider {...settings}>
      {images.map((image, index) => (
        <div key={index} className="relative h-[320px] w-full overflow-hidden">
          <Image
            src={image}
            alt={`Devcon 7 Overview ${index + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 2}
            quality={85}
            loading={index < 2 ? "eager" : "lazy"}
          />
        </div>
      ))}
    </AnySlider>
  )
}
