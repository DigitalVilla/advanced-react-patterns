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
        const { data } = this.props
        return data.map((tab, i) => {
            const isActive = i === this.state.activeIndex

            return (
                <button key={`${tab.label}-${i}`}
                    data-index={i}
                    className={`tab${isActive ? ' active' : ''}`}
                    onClick={this.selectTabIndex}
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
        return (
            <div className="card">
                <div className="tabs">
                    {this.renderTabs()}
                </div>
                <div className="panel">
                    {this.renderPanels()}
                </div>
            </div>
        )
    }
}

export default class index extends Component {
    render() {
        const tabData = [
            {
                label: 'Rental',
                content: "rental"
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
        ]

        return (
            <div className="blue-bg">
                <Tabs data={tabData}/>
            </div>
        )
    }
}

