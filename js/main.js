$(document).ready(function () {

    let rawAnsTmp = {
        '1': 'A',
        '2': 'B',
        '3': 'D',
        '4': 'D',
        '5': 'C',
        '6': 'AE',
        '7': 'A',
        '8': 'A',
        '9': 'AE',
        '10': 'B',
        '11': 'B',
        '13': 'D',
        '14': 'A',
        '15': 'B',
        '16': 'A',
        '17': 'A',
        '18': 'C',
        '19': 'A',
        '20': 'E',
        '21': 'D',
        '22': 'B',
        '23': 'C',
        '24': 'A',
        '25': 'A',
        '26': 'D',
        '27': 'C',
        '28': 'B',
        '29': 'CE',
        '30': 'C',
        '31': 'C',
        '32': 'C',
        '33': 'A',
        '34': 'A',
        '35': 'D',
        '36': 'B',
        '37': 'BC',
        '38': 'C',
        '39': 'ADF',
        '40': 'ACEF',
        '41': 'AC',
        '42': 'A',
        '43': 'ACD',
        '44': 'E',
        '45': 'BDE',
        '46': 'C',
        '47': 'B',
        '48': 'D',
        '49': 'BC',
        '50': 'C',
        '51': 'A',
        '52': 'ADE',
        '53': 'B',
        '54': 'C',
        '55': 'A',
        '56': 'D',
        '57': 'D',
        '58': 'A',
        '59': 'D',
        '60': 'AD',
        '61': 'AD',
        '62': 'CE',
        '63': 'C',
        '64': 'A',
        '65': 'A',
        '66': 'D',
        '67': 'A',
        '68': 'D',
        '69': 'C',
        '70': 'D',
        '71': 'C',
        '72': 'A',
        '73': 'AB',
        '74': 'D',
        '75': 'C',
        '76': 'A',
        '77': 'A',
        '78': 'AB',
        '79': 'C',
        '80': 'D',
        '81': 'ADE',
        '82': 'B',
        '83': 'C',
        '84': 'C',
        '85': 'B',
        '86': 'D',
        '87': 'C',
        '88': 'A',
        '89': 'D',
        '90': 'B',
        '91': 'D',
        '92': 'C',
        '93': 'B',
        '94': 'B',
        '95': 'B',
        '96': 'B',
        '97': 'A',
        '98': 'D',
        '99': 'D',
        '100': 'D',
        '101': 'D',
        '102': 'C',
        '103': 'CD',
        '104': 'B',
        '106': 'C',
        '107': 'A',
        '108': 'BD',
        '109': 'ACDF',
        '110': 'A',
        '111': 'D',
        '112': 'ABE',
        '113': 'C',
        '114': 'D',
        '115': 'ABC',
        '116': 'C',
        '117': 'B',
        '118': 'B',
        '119': 'CD',
        '120': 'C',
        '121': 'A'
    };

    // random array
    const rawAns = Object.keys(rawAnsTmp)
    .sort(function () {
        return 0.5 - Math.random()
    }).reduce((acc,key)=>{
        acc[`#${key}`] = rawAnsTmp[key]
        return acc
    },{});
    
    const quesFiles = Object.keys(rawAns).map(k => {
        return `${parseInt(k.replace('#',''))}${rawAns[k]}.png`
    });

    $('#question').attr('src', `img/${quesFiles[0]}`)

    const correctAns = Object.keys(rawAns).map(k => {
        return {
            correct: rawAns[k],
            questionNum: parseInt(k.replace('#', ''))
        }
    });

    let questionIndex = 0
    let myAns = []
    let wrongAns = new Set()
    const totalSize = Object.keys(rawAns).length

    const correctPercentage = () => {
        let correctNum = 0;
        for (let i = 0; i < myAns.length; i++) {
            if (myAns[i].toUpperCase() === correctAns[i].correct) {
                correctNum++
            } else {
                //filter the existing ones
                wrongAns.add({
                    img: correctAns[i].questionNum + correctAns[i].correct + '.png',
                    answer: correctAns[i].correct
                })
            }
        }
        
        return (correctNum * 100 / myAns.length).toFixed(2) + "%"
    }

    const goNext = () => {
        if (questionIndex < totalSize) {

            if ($('#myAns').val()) {
                myAns[questionIndex] = $('#myAns').val()
            } else {
                alert("Can't skip unanswered question")
                return
            }
            questionIndex++
            const file = quesFiles[questionIndex]
            $('#myAns').val('')
            $('#question').attr('src', `img/${file}`)
            $('#myAns').focus()
            $('#myAns').val(myAns[questionIndex])
        } else {
            alert('Last one')
        }
    }

    const goBack = () => {
        if (questionIndex > 0) {
            questionIndex--
            const file = quesFiles[questionIndex]
            $('#question').attr('src', `img/${file}`)
            $('#myAns').focus()
            $('#myAns').val(myAns[questionIndex])            
        } else {
            alert('First one')
        }
    }

    //arrow
    document.onkeyup = function (e) {
        if (e.which == 37) {
            //left, go back
            goBack()
        } else if (e.which == 39) {
            //right, go next
            goNext()
        }
    }

    //click
    $('#back').on('click', goBack)
    $('#next').on('click', goNext)

    $('#submitBtn').on('click', () => {
        const score = correctPercentage()
        const iterator1 = wrongAns.entries();

        let wrongs = '<h1>Wrong question review</h1><br>'
        wrongAns.forEach(w=>{
            wrongs += `<img src=img/${w.img} width="100%"><br><strong>${w.answer}</strong>`
        })

        $('#score').text(score)
        $('#wrongs').html(wrongs)
    })

});
