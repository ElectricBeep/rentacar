import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { Button } from "../button";
import { Marginer } from "../marginer";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from "react";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { SCREENS } from "../responsive";

const CardContainer = styled.div`
    min-height: 4.3em;
    box-shadow: 0 1.3px 12px -3px rgba(0, 0, 0, 0.4);

    ${tw`
        flex
        justify-center
        items-center
        rounded-md
        bg-white
        pt-1
        pb-1
        pr-2
        pl-2
        md:pt-2
        md:pb-2
        md:pl-9
        md:pr-9
    `};
`;

const ItemContainer = styled.div`
    ${tw`
        flex
        relative
    `};
`;

const Icon = styled.span`
    ${tw`
        text-red-500
        fill-current
        text-xs
        md:text-base
        mr-1
        md:mr-3
    `};
`;

const Name = styled.span`
    ${tw`
        text-gray-600
        text-xs
        md:text-sm
        cursor-pointer
        select-none
    `};
`;

const SmallIcon = styled.span`
    ${tw`
        text-gray-500
        fill-current
        text-xs
        md:text-base
        ml-2
    `};
`;

const LineSeperator = styled.span`
    width: 2px;
    height: 45%;
    ${tw`
        bg-gray-300
        mr-2
        ml-2
        md:mr-5
        md:ml-5
    `};
`;

const DateCalendar = styled(Calendar)`
    position: absolute;
    max-width: none;
    user-select: none;
    top: 2em;
    left: 0;

    ${({ offset }: any) => offset && css`
        left: -6em;
    `};

    @media (min-width: ${SCREENS.md}) {
        top: 3.5em;
        left: -2em;
    }
` as any;

export function BookCar() {
    //For selecting start date
    const [startDate, setStartDate] = useState(new Date());
    const [isStartCalendarOpen, setIsStartCalendarOpen] = useState(false);
    //For selecting return date
    const [returnDate, setReturnDate] = useState(new Date());
    const [isReturnCalendarOpen, setIsReturnCalendarOpen] = useState(false);

    const toggleStartDateCalendar = () => {
        setIsStartCalendarOpen(!isStartCalendarOpen);
        setIsReturnCalendarOpen(false);
    };

    const toggleReturnDateCalendar = () => {
        setIsReturnCalendarOpen(!isReturnCalendarOpen);
        setIsStartCalendarOpen(false);
    };

    return (
        <CardContainer>
            <ItemContainer>
                <Icon>
                    <FontAwesomeIcon icon={faCalendarAlt} />
                </Icon>
                <Name onClick={toggleStartDateCalendar}>Pick Up Date</Name>
                <SmallIcon>
                    <FontAwesomeIcon icon={isStartCalendarOpen ? faCaretDown : faCaretUp} />
                </SmallIcon>
                {isStartCalendarOpen && (
                    <DateCalendar value={startDate} onChange={setStartDate as any} />
                )}
            </ItemContainer>
            <LineSeperator />
            <ItemContainer>
                <Icon>
                    <FontAwesomeIcon icon={faCalendarAlt} />
                </Icon>
                <Name onClick={toggleReturnDateCalendar}>Return Date</Name>
                <SmallIcon>
                    <FontAwesomeIcon icon={isReturnCalendarOpen ? faCaretDown : faCaretUp} />
                </SmallIcon>
                {isReturnCalendarOpen && (
                    <DateCalendar
                        offset
                        value={returnDate}
                        onChange={setReturnDate as any}
                    />
                )}
            </ItemContainer>
            <Marginer direction="horizontal" margin="2em" />
            <Button text="Book Your Ride" />
        </CardContainer>
    )
};