var d3 = require ('d3');

var Sorting = () => {

    var HIGHLIGHT_NONE = "lightblue";
    var HIGHLIGHT_STANDARD = "green";
    var HIGHLIGHT_SPECIAL = "#DC143C";
    var HIGHLIGHT_SORTED = "orange";

    var HIGHLIGHT_LEFT = "#3CB371";
    var HIGHLIGHT_RIGHT = "#9932CC";
    var HIGHLIGHT_PIVOT = "yellow";

    var HIGHLIGHT_GRAY = "#CCCCCC";

    var barWidth = 50;
    var maxHeight = 230;
    var gapBetweenBars = 5;
    var maxNumOfElements = 15;
    var gapBetweenPrimaryAndSecondaryRows = 30; // of the bars
    var maxElementValue = 50;
    var maxRadixElementValue = 9999;

    var transitionTime = 750;
    var issPlaying;
    var animInterval;
    var currentStep;
    var centreBarsOffset;
    var computeInversionIndex = false;
    var radixSortBucketOrdering;

    var selectedSortFunction;

    var scaler;
    var canvas;
    var radixSortCanvas;
    var width;

    scaler = d3.scaleLinear(0 , maxHeight);

    // scaler = d3.scale
    //     .linear()
    //     .range([0, maxHeight]);

    width = $(".gridGraph").width();

    canvas = d3.select("#viz-canvas")
        .attr("height", maxHeight * 2 + gapBetweenPrimaryAndSecondaryRows)
        .attr("width", width);

    radixSortCanvas = d3.select("#viz-radix-sort-canvas");

    var statelist = new Array();
    var secondaryStateList = new Array();

    var POSITION_USE_PRIMARY = "a";
    var POSITION_USE_SECONDARY_IN_DEFAULT_POSITION = "b";

    var numArray;

    var generateRandomNumberArray = function (size, limit) {
        var numArray = new Array();
        for (var i = 0; i < size; i++) {
            numArray.push(generateRandomNumber(1, limit));
        }
        return numArray;
    };

    var generateRandomNumber = function (min, max) { //generates a random integer between min and max (both inclusive)
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    var clearPseudocode = function () {
        populatePseudocode([]);
    }

    var clearLog = function () {
        $('#log > p').html('');
    }

    var clearStatus = function () {
        $('#status > p').html('');
    }

    var populatePseudocode = function (code) {
        var i = 1;
        for (; i <= 12 && i <= code.length; i++) {
            $("#code" + i).html(
                code[i - 1].replace(
                    /^\s+/,
                    function (m) {
                        return m.replace(/\s/g, "&nbsp;");
                    }
                )
            );
        }
        for (; i <= 7; i++) {
            $("#code" + i).html("");
        }
    }

    var initLogMessage = function (state) {
        state.logMessage = "original array = [";

        for (var i = 0; i < state.backlinks.length - 1; i++) {
            state.logMessage += state.backlinks[i].value + ", ";
        }

        state.logMessage += state.backlinks[state.backlinks.length - 1].value + "]";
    }

    var getStateList = function (type, data) {
        var source = { type: type, data: data };
        $.ajax({
            url: "http://localhost:6969/api/sorting",
            type: "POST",
            data: JSON.stringify(source),
            cache: false,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                statelist = data;
            },
            error: function (error) {
                console.log("error" + error.responseText);
            }
        });
    }

    var bubbleSort = function (callback) {

        getStateList('bubbleSort', numArray);

        populatePseudocode([
            'do',
            '  swapped = false',
            '  for i = 1 to indexOfLastUnsortedElement-1',
            '    if leftElement > rightElement',
            '      swap(leftElement, rightElement)',
            '      swapped = true' + ((this.computeInversionIndex) ? '; swapCounter++' : ""),
            'while swapped'
        ]);

        this.play(callback);
        return true;
    }

    var selectionSort = function (callback) {
        getStateList('selectionSort', numArray);

        populatePseudocode([
            'repeat (numOfElements - 1) times',
            '  set the first unsorted element as the minimum',
            '  for each of the unsorted elements',
            '    if element < currentMinimum',
            '      set element as new minimum',
            '  swap minimum with first unsorted position'
        ]);

        this.play(callback);
        return true;
    }

    var quickSortUseRandomizedPivot;



    var quickSort = function (callback) {
        getStateList('quickSort', numArray);

        populatePseudocode([
            'for each (unsorted) partition',
            (quickSortUseRandomizedPivot) ? 'randomly select pivot, swap with first element' : 'set first element as pivot',
            '  storeIndex = pivotIndex + 1',
            '  for i = pivotIndex + 1 to rightmostIndex',
            '    if element[i] < element[pivot]',
            '      swap(i, storeIndex); storeIndex++',
            '  swap(pivot, storeIndex - 1)'
        ]);
        quickSortUseRandomizedPivot = false;

        this.play(callback);
        return true;
    }

    var insertionSort = function (callback) {
        getStateList('insertionSort', numArray);

        populatePseudocode([
            'mark first element as sorted',
            '  for each unsorted element X',
            '    extract the element X',
            '    for j = lastSortedIndex down to 0',
            '      if current element j > X',
            '        move sorted element to the right by 1',
            '      break loop and insert X here'
        ]);

        this.play(callback);
        return true;
    }

    var cocktailShakerSort = function (callback) {
        getStateList('cocktailShakerSort', numArray);

        populatePseudocode([
            'swapped = false, start = 0, end = last index',
            'while (swapped = true)',
            '  for i = start to end',
            '    if leftElement > rightElement',
            '      swap(leftElement, rightElement); swapped = true',
            '  if swapped = false: break loop',
            '  else: swapped = false and end--',
            '  for i = end to start',
            '    if rightElement < leftElement',
            '      swap(leftElement, rightElement); swapped = true',
            '  if swapped = false: break loop',
            '  else: swapped = false and start++'
        ]);

        this.play(callback);
        return true;
    }

    var combSort = function (callback) {
        getStateList('combSort', numArray);

        populatePseudocode([
            'swapped = false, gap = listLength',
            'while (swapped = true or gap != 1)',
            '  gap = gap / 1.3',
            '  swap = false',
            '  for i = 0 to listLength - gap',
            '    if gapHeadElement > gapTailElement',
            '      swap(gapHeadElement, gapTailElement)',
            '      swapped = true'
        ]);

        play(callback);

        return true;
    }

    var shellSort = function (callback) {
        getStateList('shellSort', numArray);

        populatePseudocode([
            'create gap by half of list length',
            '  do',
            '    divide gap by 2',
            '    do',
            '      if gapHeadElement > gapTailElement',
            '        swap(gapHeadElement, gapTailElement)',
            '    while (firstIndexToGapHead\'s length < gapLength)',
            '  while (gapLength >= 1)'
        ]);

        play(callback);

        return true;
    }

    var mergeSort = function (callback) {
        getStateList('mergeSort', numArray);

        populatePseudocode([
            'split each element into partitions of size 1',
            'recursively merge adjancent partitions',
            '  for i = leftPartStartIndex to rightPartLastIndex inclusive',
            '    if leftPartHeadValue <= rightPartHeadValue',
            '      copy leftPartHeadValue',
            '    else: copy rightPartHeadValue',
            'copy elements back to original array'
        ]);

        play(callback);

        return true;
    }

    var drawCurrentState = function () {
        drawState(currentStep);
        if (currentStep == (statelist.length - 1)) {
            pause();
        }
    }

    var drawState = function (stateIndex) {
        if (isRadixSort) {
            drawRadixSortCanvas(statelist[stateIndex], secondaryStateList[stateIndex]);
        } else {
            drawBars(statelist[stateIndex]);
        }
        $('#status p').html(statelist[stateIndex].status);
        $('#log p').html(statelist[stateIndex].logMessage);
        highlightLine(statelist[stateIndex].lineNo);
    };

    var drawBars = function (state) {
        barWidth = width / (state.entries.length);
        scaler.domain([d3.min(state.entries, function (d) {
            return d.value;
        }) - 1, d3.max(state.entries, function (d) {
            return d.value;
        })]);

        centreBarsOffset = 0;

        var canvasData = canvas.selectAll("g").data(state.entries);

        // Exit ==============================
        var exitData = canvasData.exit()
            .remove();

        // Entry ==============================
        var newData = canvasData.enter()
            .append("g")
            .attr("transform", FunctionList.g_transform);

        newData.append("rect")
            .attr("height", 0)
            .attr("width", 0);

        newData.append("text")
            .attr("dy", ".35em")
            .attr("x", (barWidth - gapBetweenBars - 10) / 2)
            .attr("y", FunctionList.text_y)
            .text(function (d) {
                return d.value;
            });

        // Update ==============================
        canvasData.select("text")
            .transition()
            .attr("y", FunctionList.text_y)
            .text(function (d) {
                return d.value;
            });

        canvasData.select("rect")
            .transition()
            .attr("height", function (d) {
                return scaler(d.value);
            })
            .attr("width", barWidth - gapBetweenBars)
            .style("fill", function (d) {
                return d.highlight;
            });

        canvasData.transition()
            .attr("transform", FunctionList.g_transform)
    };

    var drawRadixSortCanvas = function (state, secondaryState) {
        centreBarsOffset = (1700 - (state.entries.length * 65 - 10)) / 2;
        var canvasData = radixSortCanvas.selectAll("div").data(state.entries);
        var radixSortBucket = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        radixSortBucketOrdering = new Array(state.backlinks.length);

        for (var i = 0; i < state.backlinks.length; i++) {
            if (state.backlinks.secondaryPositionStatus != POSITION_USE_PRIMARY) {
                radixSortBucketOrdering[state.backlinks[i].entryPosition] = radixSortBucket[state.backlinks[i].secondaryPositionStatus]++;
            }
        }

        // If there's step needs bucket to show
        if (secondaryState) {
            $('#radix-sort-bucket-labels').show();
        } else {
            $('#radix-sort-bucket-labels').hide();
        }

        // Exit ==============================
        var exitData = canvasData.exit()
            .remove();

        // Entry ==============================
        var newData = canvasData.enter()
            .append('div')
            .classed({ "radix-sort-element": true })
            .style({
                "left": FunctionList.radixElement_left,
                "bottom": FunctionList.radixElement_bottom
            }).html(FunctionList.radixElement_html);

        // Update ==============================
        canvasData.html(FunctionList.radixElement_html)
            .transition()
            .style({
                "left": FunctionList.radixElement_left,
                "bottom": FunctionList.radixElement_bottom
            });
    };

    var play = function (callback) {
        issPlaying = true;
        drawCurrentState();
        animInterval = setInterval(function () {
            drawCurrentState();
            if (currentStep < (statelist.length - 1))
                currentStep++;
            else {
                clearInterval(animInterval);
                if (typeof callback == 'function') callback();
            }
        }, transitionTime);
    }

    var pause = function () {
        issPlaying = false;
        clearInterval(animInterval);
    }

    var replay = function () {
        issPlaying = true;
        currentStep = 0;
        drawCurrentState();
        animInterval = setInterval(function () {
            drawCurrentState();
            if (currentStep < (statelist.length - 1))
                currentStep++;
            else
                clearInterval(animInterval);
        }, transitionTime);
    }

    var stop = function () {
        issPlaying = false;
        statelist = [statelist[0]]; //clear statelist to original state, instead of new Array();
        currentStep = 0;
        drawState(0);
        transitionTime = 750;
    }

    var loadNumberList = function (numArray) {
        issPlaying = false;
        currentStep = 0;

        statelist = [StateHelper.createNewState(numArray)];
        secondaryStateList = [null];
        drawState(0);
        this.clearLog();
        this.clearStatus();
    }

    var createList = function (type) {
        var numArrayMaxListSize = 15;
        var numArrayMinListSize = 3;
        var numArrayMaxElementValue = maxElementValue;
        if (isRadixSort) {
            numArrayMaxListSize = 15;
            numArrayMaxElementValue = maxRadixElementValue;
        }

        numArray = generateRandomNumberArray(generateRandomNumber(10, numArrayMaxListSize), numArrayMaxElementValue);

        switch (type) {
            case 'random':
                break;
            case 'custom':
                numArray = $('#custom-input').val().split(",");

                if (numArray.length > numArrayMaxListSize) {
                    window.alert('List max size is ' + numArrayMaxListSize);
                    return false;
                }

                if (numArray.length < numArrayMinListSize) {
                    window.alert('List min size is ' + numArrayMinListSize);
                    return false;
                }

                for (var i = 0; i < numArray.length; i++) {
                    var num = convertToNumber(numArray[i]);

                    if (numArray[i].trim() == "") {
                        window.alert('Missing element in custom list!');
                        return false;
                    }

                    if (isNaN(num)) {
                        window.alert('Element \"{el}\" is not number!'.replace('{el}', numArray[i].trim()));
                        return false;
                    }

                    // if (num < 1 || num > numArrayMaxElementValue) {
                    //     window.alert('Element range must be in range from {min} to {max}'.replace('{min}', '1').replace('{max}',numArrayMaxElementValue));
                    //     return false;
                    // }

                    numArray[i] = convertToNumber(numArray[i]);
                }
                break;
        }

        loadNumberList(numArray);
    }

    var init = function () {
        this.createList('random');
        // showCodetracePanel();
        // showStatusPanel();
    }

    var setSelectedSortFunction = function (f) {
        selectedSortFunction = f;
        // this.sort();
        // isRadixSort = (this.selectedSortFunction == this.radixSort);
        // isCountingSort = (this.selectedSortFunction == this.countingSort);
    }

    var sort = function (callback) {
        return this.selectedSortFunction(callback);
    }

    var getCurrentIteration = function () {
        return currentStep;
    }

    var getTotalIteration = function () {
        return statelist.length;
    }

    var forceNext = function () {
        if ((currentStep + 1) < statelist.length)
            currentStep++;
        drawCurrentState();
    }

    var forcePrevious = function () {
        if ((currentStep - 1) >= 0)
            currentStep--;
        drawCurrentState();
    }

    var jumpToIteration = function (n) {
        currentStep = n;
        drawCurrentState();
    }
}

module.exports = Sorting;