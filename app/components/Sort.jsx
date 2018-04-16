var React = require('react');
var createReactClass = require('create-react-class');

var { Switch, Route, Router } = require('react-router-dom');

var Course = require('Course');

import SortAPI from '../api/SortAPI.js'

var Sort = createReactClass({
    getInitialState: function () {
        return {
            link: "/sort",
            title: "CONTENTS",
            lessons: [
                "Introduction",
                "Bubble sort and variants",
                "Selection Sort",
                "Insertion Sort"
            ],
            subLessons: [
                {
                    title: "Introduction",
                    data: [
                        "Problems",
                        "Ideas",
                        "Types",
                        "Applications"
                    ]
                },
                {
                    title: "Bubble sort and variants",
                    data: [
                        "Idea of Bubble Sort",
                        "Pseudo of Bubble Sort",
                        "Bubble Sort",
                        "Ideas for variants",
                        "Shell Sort",
                        "Comb Sort"
                    ]
                },
                {
                    title: "Selection Sort",
                    data: [
                        "Idea of Selection Sort",
                        "Pseudo of Selection Sort",
                        "Selection Sort Animation"
                    ]
                },
                {
                    title: "Insertion Sort",
                    data: [
                        "Idea of Insertion Sort",
                        "Pseudo of Insertion Sort",
                        "Insertion Sort Animation"
                    ]
                }
            ]
        }
    },
    render: function () {

        const x = SortAPI.get("Introduction");

        return (
            <div>
                <Course
                    link={this.state.link}
                    title={this.state.title}
                    lessons={this.state.lessons}
                    subLessons={this.state.subLessons}>
                </Course>
            </div>
        )
    }
});

module.exports = Sort;