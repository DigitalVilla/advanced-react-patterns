import React, { Component, Children } from 'react'
import './sass/main.scss'

class Card extends Component {
    state = {
        activeIndex: 0,
    }

    selectTabIndex = (e) => {
        this.setState({ activeIndex: parseInt(e.target.dataset.index) })
    }

    render() {
        const children = React.Children.map(this.props.children, (child, i) => {
            return React.cloneElement(child, {
                activeIndex: this.state.activeIndex,
                disabledIndex: this.state.disabledIndex,
                onSelect: this.selectTabIndex,
            })
        })

        return (
            <div className="card">
                {children}
            </div>
        )
    }
}

const Tabs = (props) => {
    const children = React.Children.map(props.children, (child, i) => {
        return React.cloneElement(child, {
            index: i,
            onSelect: props.onSelect,
            isActive: i === props.activeIndex,
        })
    })

    return (
        <div className="tabs">
            {children}
        </div>
    )
}
const Tab = ({ isActive, isDisabled, ...rest }) => {
    return (
        <button
            data-index={rest.index}
            className={`tab${!isDisabled && isActive ? ' active' : ''}`}
            disabled={isDisabled}
            onClick={rest.onSelect}
        > {rest.children} </button>
    )
}

const Panels = (props) => {
    return (
        <div className="panel">
            {React.Children.map(props.children, (child, i) => {
                return props.activeIndex === i ? child : null
            })}
        </div>
    )
}

const Panel = (props) => (props.children)

export default function index() {
    return (
        <div className="blue-bg">
            <Card>
               
                <Panels>
                    <Panel><h2>Rentals</h2></Panel>
                    <Panel><h2>Hotels</h2></Panel>
                    <Panel><h2>Flights</h2></Panel>
                    <Panel><h2>Restaurants</h2></Panel>
                    <Panel><h2>Events</h2></Panel>
                </Panels>
                <Tabs>
                    <Tab>Rentals</Tab>
                    <Tab>Hotels</Tab>
                    <Tab isDisabled>Flights</Tab>
                    <Tab>Restaurants</Tab>
                    <Tab isDisabled>Events</Tab>
                </Tabs>
            </Card>
        </div>
    )
}