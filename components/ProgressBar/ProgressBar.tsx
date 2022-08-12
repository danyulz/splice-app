import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'

type ProgressBarProps = {
    progress: number
}

const BarWrapper = styled.View`
    width: 90%;
    height: 5px;
    border-radius: 5px;
    background: grey;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`

const Progress = styled.View`
    height: 5px;
    width: ${(props: ProgressBarProps) => props.progress*100 + "%"};
    border-radius: 5px;
    background-color: red;
`

const ProgressBar = ({ progress }: ProgressBarProps) => {
    return (
        <BarWrapper>
            <Progress progress={progress}/>
        </BarWrapper>
    );
}

export default ProgressBar;