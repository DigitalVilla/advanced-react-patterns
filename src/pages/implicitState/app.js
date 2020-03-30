import React, { Component } from 'react'
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

function DataCard({ data, disabled, tabsOnBottom }) {
    const panels = data.map((tab, i) => (
        <Panel key={i}> {tab.content}</Panel>
    ))

    const tabs = data.map((tab, i) => {
        const dataset = Array.isArray(disabled) &&
            disabled.includes(i) ? { isDisabled: true } : {}

        return (
            <Tab key={i} {...dataset}> {tab.label} </Tab>
        )
    })

    return tabsOnBottom ? (
        <Card>
            <Panels>{panels}</Panels>
            <Tabs>{tabs}</Tabs>
        </Card>
    ) :
    (
        <Card>
            <Tabs>{tabs}</Tabs>
            <Panels>{panels}</Panels>
        </Card>
    )
}


export default function index() {
    const tabData = [
        {
            label: 'Rental',
            content: "Rental"
        },
        {
            label: 'Hotels',
            content: "Hotels"
        },
        {
            label: 'Flights',
            content: "Flights"
        },
        {
            label: 'Restaurnat',
            content: "Restaurnat"
        },
        {
            label: 'Events',
            content: "Events"
        },
    ]

    return (
        <div className="blue-bg">
            <DataCard
                data={tabData}
                disabled={[1]}
                tabsOnBottom={false} />
        </div>
    )
}