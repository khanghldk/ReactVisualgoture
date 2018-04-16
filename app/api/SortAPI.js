const SortAPI = {
  sortCourse: {
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
  },
  all: function () { return this.sortCourse },
  get: function (lessonName) {
    var result = {
      title: "",
      subLessons: []
    };

    for (var i = 0; i < this.sortCourse.lessons.length; i++) {
      if (this.sortCourse.lessons[i] === lessonName) {
        result = {
          title: this.sortCourse.lessons[i],
          subLessons: this.sortCourse.subLessons[i].data
        }
      }
    }
    return result;
  }
}

export default SortAPI;
