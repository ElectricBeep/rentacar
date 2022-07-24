import styled from "styled-components";
import tw from "twin.macro";
// import { ICar } from "../../../typings/car";
import { Car } from "../../components/car";
import Carousel, { Dots, slidesToShowPlugin } from "@brainhubeu/react-carousel"
import '@brainhubeu/react-carousel/lib/style.css';
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { SCREENS } from "../../components/responsive";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { GetCars_cars } from "../../services/carService/__generated__/GetCars";
import { setTopCars } from "./slice";
import { makeSelectTopCars } from "./selectors";

const TopCarsContainer = styled.div`
    ${tw`
        max-w-screen-lg
        w-full
        flex
        flex-col
        items-center
        justify-center
        pr-4
        pl-4
        md:pr-0
        md:pl-0
        mb-10
    `};
`;

const Title = styled.h2`
    ${tw`
        text-3xl
        lg:text-5xl
        text-black
        font-black
    `};
`;

const CarsContainer = styled.div`
    ${tw`
        w-full
        flex
        flex-wrap
        justify-center
        mt-7
        md:mt-10
    `};
`;

const EmptyCars = styled.div`
    ${tw`
        w-full
        flex
        items-center
        justify-center
        text-sm
        text-gray-500
    `};
`;

const LoadingContainer = styled.div`
    ${tw`
        w-full
        mt-9
        flex
        items-center
        justify-center
        text-base
        text-black
    `};
`;

const actionDispatch = (dispatch: Dispatch) => ({
    setTopCars: (cars: GetCars_cars[]) => dispatch(setTopCars(cars))
});

const stateSelector = createSelector(makeSelectTopCars, (topCars) => ({
    topCars
}));

export function TopCars() {
    const [current, setCurrent] = useState(0);

    const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

    const carList = [
        {
            id: 1,
            dailyPrice: 80,
            gas: "Disel",
            gearType: "Auto",
            kilometrage: "22K",
            monthlyPrice: 1800,
            name: "Mercedes S Class Car",
            thumbnailUrl: "https://di-uploads-pod8.dealerinspire.com/mercedesbenzofclearlake/uploads/2021/07/S-Class-Premium-PNG.png"
        },
        {
            id: 2,
            dailyPrice: 100,
            gas: "Petrol",
            gearType: "Auto",
            kilometrage: "10K",
            monthlyPrice: 2000,
            name: "Porsche 911 Car",
            thumbnailUrl: "https://blog.japanesecartrade.com/wp-content/uploads/2020/05/Porsche-911-New-1-1024x491.png"
        },
        {
            id: 3,
            dailyPrice: 60,
            gas: "Disel",
            gearType: "Auto",
            kilometrage: "36K",
            monthlyPrice: 1600,
            name: "Peugeot 508 Car",
            thumbnailUrl: "https://www.arnoldclark.com/cdn/images/peugeot/508/ultimate-red.png"
        },
        {
            id: 4,
            dailyPrice: 30,
            gas: "Petrol",
            gearType: "Manual",
            kilometrage: "60K",
            monthlyPrice: 1300,
            name: "Mazda 3 Car",
            thumbnailUrl: "https://file.kelleybluebookimages.com/kbb/base/evox/CP/10850/2016-MAZDA-MAZDA3-front_10850_032_1814x780_41V_cropped.png"
        },
        {
            id: 5,
            dailyPrice: 80,
            gas: "Petrol",
            gearType: "Auto",
            kilometrage: "10K",
            monthlyPrice: 1800,
            name: "BMW i8 Car",
            thumbnailUrl: "https://www.motortrend.com/uploads/sites/10/2017/05/2017-bmw-i8-hybrid-coupe-angular-front.png"
        },
        {
            id: 6,
            dailyPrice: 50,
            gas: "Petrol",
            gearType: "Auto",
            kilometrage: "20K",
            monthlyPrice: 1500,
            name: "Audi S3 Car",
            thumbnailUrl: "https://www.motortrend.com/uploads/sites/10/2017/10/2018-audi-s3-premium-plus-sedan-angular-front.png"
        },
        {
            id: 7,
            dailyPrice: 40,
            gas: "Disel",
            gearType: "Auto",
            kilometrage: "25K",
            monthlyPrice: 1400,
            name: "Volkswagen Golf Car",
            thumbnailUrl: "https://di-uploads-pod10.dealerinspire.com/volkswagenofpalmsprings/uploads/2018/04/2018-Volkswagen-Golf-header.png"
        },
        {
            id: 8,
            dailyPrice: 40,
            gas: "Disel",
            gearType: "Manual",
            kilometrage: "40K",
            monthlyPrice: 1400,
            name: "Toyota C-HR Car",
            thumbnailUrl: "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_default/v1/editorial/toyota-c-hr-2018-index-yellow.png"
        }
    ];

    const cars = carList.map((car) => <Car {...car} thumbnailSrc={car.thumbnailUrl} />) || ([]);

    const numberOfDots = isMobile ? cars.length : Math.ceil(cars.length / 1);

    return (
        <TopCarsContainer>
            <Title>Explore Our Top Deals</Title>
            {<CarsContainer>
                <Carousel
                    value={current}
                    onChange={setCurrent}
                    slides={cars}
                    plugins={[
                        "clickToChange",
                        {
                            resolve: slidesToShowPlugin,
                            options: {
                                numberOfSlides: 3
                            }
                        }
                    ]}
                    breakpoints={{
                        640: {
                            plugins: [
                                {
                                    resolve: slidesToShowPlugin,
                                    options: {
                                        numberOfSlides: 1
                                    }
                                }
                            ]
                        },
                        900: {
                            plugins: [
                                {
                                    resolve: slidesToShowPlugin,
                                    options: {
                                        numberOfSlides: 2
                                    }
                                }
                            ]
                        }
                    }}
                />
                <Dots
                    value={current}
                    onChange={setCurrent}
                    number={numberOfDots}
                />
            </CarsContainer>}
        </TopCarsContainer>
    )
};