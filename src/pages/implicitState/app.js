import React, { Component } from 'react'
import './sass/main.scss'

class Tabs extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeIndex: 0
        }

        this.selectTabIndex = this.selectTabIndex.bind(this);
    }

    selectTabIndex(e) {
        this.setState({ activeIndex:  parseInt(e.target.dataset.index)})
    }

    renderTabs() {
        const { data, disabled } = this.props
        return data.map((tab, i) => {
            const isActive = i === this.state.activeIndex
            const isDisabled = disabled && parseInt(disabled) === i;

            return (
                <button key={`${tab.label}-${i}`}
                    data-index={i}
                    className={`tab${isActive ? ' active' : ''}`}
                    onClick={this.selectTabIndex}
                    disabled={isDisabled}
                >
                    {tab.label}
                </button>
            )
        })
    }

    renderPanels () {
        const {data} = this.props
        const { activeIndex } = this.state
        return ( <div>{data[activeIndex].content}</div> )
    }




    render() {
        const {tabsOnBottom} = this.props;

        const tabs = (
            <div className="tabs">
                {this.renderTabs()}
            </div>
        )

        const panel = (
            <div className="panel">
                {this.renderPanels()}
            </div>
        )

        return (
            <div className="card">
                {tabsOnBottom ? [ panel, tabs ] : [tabs, panel]}
            </div>
        )
    }
}

export default class index extends Component {
    render() {
        const tabData = [
            {
                label: 'Rental',
                content: (<h2>Rental</h2>)
            },
            {
                label: 'Hotels',
                content: (<h2>Hotels</h2>)
            },
            {
                label: 'Flights',
                content: (<h2>Flights</h2>)
            },
            {
                label: 'Restaurnat',
                content: (<h2>Restaurant</h2>)
            },
        ]

        return (
            <div className="blue-bg">
                <Tabs
                disabled={1}
                data={tabData}
                tabsOnBottom={true}/>
            </div>
        )
    }
}

