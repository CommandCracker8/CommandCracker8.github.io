let width = 1160;
let height = 800;

let cardBg1;
let cardBg2;

let cardBg1Part2;
let cardBg2Part2;

let bgCol;

let card1Info;
let card2Info;

let cardInfo = [];

let cardsJSON;

let attrSpeed;
let attrStrength;
let attrIntelligence;
let attrCharisma;
let attrTech;

let OnCardResetSound;
let OnSelectSound;

let Categories = {
    SPEED: "Speed",
    STRENGTH: "Strength",
    INTELLIGENCE: "Intelligence",
    CHARISMA: "Charisma",
    TECH: "Tech"
}

let SelectedCategory = Categories.SPEED

let Screens = {
    GAME: 0,
    KEYBINDS: 1
}

let CurrentScreen;

let canv;

function preload() {
    cardsJSON = loadJSON('data/cards.json')

    attrSpeed = loadImage('assets/speed.png')
    attrStrength = loadImage('assets/strength.png')
    attrIntelligence = loadImage('assets/intel.png')
    attrCharisma = loadImage('assets/Charm.png')
    attrTech = loadImage('assets/Tech.png')

    OnCardResetSound = loadSound('assets/OnCardReset.wav')
    OnSelectSound = loadSound('assets/OnSelect.wav')

    CurrentScreen = Screens.GAME
}

function setup() {
    canv = createCanvas(windowWidth, windowHeight);

    bgCol = color(51)

    loadCards()

    resetCards()

    // console.log(cardInfo)
}

let gap = 60;
let cardWidth = (width - (gap * 4)) / 2;
console.log(cardWidth)
let cardHeight = (height - (gap * 2)) - 25
cardHeight -= 75

let bvl = 30;

let player1Name = "Player 1"
let player2Name = "Player 2"


// let cardFont;

// function preload() {
//     cardFont = loadFont('./assets/Arial-BoldMT-24.vlw')
// }

var endRandom = -1;

function draw() {
    background(bgCol);
    background(0, 100, 125);

    if (CurrentScreen == Screens.GAME) {

        push()
        
        textAlign(CENTER)
        noStroke()
        textStyle(BOLD)
        textSize(48)
        fill(255, 255, 255)
        text(player1Name, gap + (cardWidth / 2), (gap / 2) + 15)
        text(player2Name, (gap * 3) + (cardWidth / 2) + cardWidth, (gap / 2) + 15)

        pop()

        fill(cardBg1);
        stroke(0, 0, 0);
        strokeWeight(5);

        rect(gap, gap, cardWidth, cardHeight, bvl);

        fill(bgCol)
        rect(gap + 20, gap + 20, cardWidth - 40, cardHeight - 40, bvl / 1.5);

        fill(cardBg1Part2);
        rect(gap + 20, gap + 20 + (cardHeight / 2), cardWidth - 40, (cardHeight / 2) - 40, bvl / 1.5);

        push()

        textAlign(CENTER);
        textSize(32)
        rectMode(CENTER)
        fill(cardBg1)
        rect(gap + (cardWidth / 2), gap + (cardHeight / 2) + 10, cardWidth - 40, 55);
        fill(255, 255, 255);
        textStyle(BOLD)
        noStroke()
        text(card1Info.name, gap + (cardWidth / 2), gap + (cardHeight / 2) + 10 + 10);

        pop()


        push()

        imageMode(CENTER)
        rectMode(CENTER)
        stroke(20)
        fill(0, 0, 0, 0)
        var imgSize = 256 - (128 / 2)
        rect(gap + (cardWidth / 2), gap + ((cardHeight / 2)) / 2, imgSize, imgSize)
        noSmooth()
        image(card1Info.image, gap + (cardWidth / 2), gap + ((cardHeight / 2)) / 2, imgSize, imgSize)

        pop()

        // ATTRIBUTES

        let attrWidth
        let attrGap = 40

        push()
        fill(255, 255, 255);
        textStyle(BOLD)
        textStyle(BOLD)
        textSize(32)
        noStroke()
        text("Speed:", 
            gap + 35, 
            gap + (cardHeight / 2) + 80 + (attrGap * 0))
        attrWidth = 32
        // card1Info.attributes.speed = 5
        for (var i = 0; i < card1Info.attributes.speed; i++) {
            imageMode(TOP)
            noSmooth()
            image(attrSpeed, 
                ((gap + cardWidth) - 40 - (i * attrWidth)) - attrSpeed.width, 
                (gap + (cardHeight / 2) + 85) - (attrSpeed.height * 1), 
                attrWidth, attrWidth)
        }
        pop()


        push()
        fill(255, 255, 255);
        textStyle(BOLD)
        textStyle(BOLD)
        textSize(32)
        noStroke()
        text("Strength:", 
            gap + 35, 
            gap + (cardHeight / 2) + 80 + (attrGap * 1))
        attrWidth = 32
        // card1Info.attributes.strength = 5
        for (var i = 0; i < card1Info.attributes.strength; i++) {
            imageMode(TOP)
            noSmooth()
            image(attrStrength, 
                ((gap + cardWidth) - 40 - (i * attrWidth)) - attrStrength.width, 
                (gap + (cardHeight / 2) + 85 + (attrGap * 1)) - (attrStrength.height * 1), 
                attrWidth, attrWidth)
        }
        pop()


        push()
        fill(255, 255, 255);
        textStyle(BOLD)
        textStyle(BOLD)
        textSize(32)
        noStroke()
        text("Intelligence:", 
            gap + 35, 
            gap + (cardHeight / 2) + 80 + (attrGap * 2))
        attrWidth = 32
        // card1Info.attributes.intelligence = 5
        for (var i = 0; i < card1Info.attributes.intelligence; i++) {
            imageMode(TOP)
            noSmooth()
            image(attrIntelligence, 
                ((gap + cardWidth) - 40 - (i * attrWidth)) - attrIntelligence.width, 
                (gap + (cardHeight / 2) + 85 + (attrGap * 2)) - (attrIntelligence.height * 1), 
                attrWidth, attrWidth)
        }
        pop()


        push()
        fill(255, 255, 255);
        textStyle(BOLD)
        textStyle(BOLD)
        textSize(32)
        noStroke()
        text("Charisma:", 
            gap + 35, 
            gap + (cardHeight / 2) + 80 + (attrGap * 3))
        attrWidth = 32
        // card1Info.attributes.charisma = 5
        for (var i = 0; i < card1Info.attributes.charisma; i++) {
            imageMode(TOP)
            noSmooth()
            image(attrCharisma, 
                ((gap + cardWidth) - 40 - (i * attrWidth)) - attrCharisma.width, 
                (gap + (cardHeight / 2) + 85 + (attrGap * 3)) - (attrCharisma.height * 1), 
                attrWidth, attrWidth)
        }
        pop()


        push()
        fill(255, 255, 255);
        textStyle(BOLD)
        textStyle(BOLD)
        textSize(32)
        noStroke()
        text("Tech:", 
            gap + 35, 
            gap + (cardHeight / 2) + 80 + (attrGap * 4))
        attrWidth = 32
        // card1Info.attributes.tech = 5
        for (var i = 0; i < card1Info.attributes.tech; i++) {
            imageMode(TOP)
            noSmooth()
            image(attrTech, 
                ((gap + cardWidth) - 40 - (i * attrWidth)) - attrTech.width, 
                (gap + (cardHeight / 2) + 85 + (attrGap * 4)) - (attrTech.height * 1), 
                attrWidth, attrWidth)
        }
        pop()



        


        fill(cardBg2);
        stroke(0, 0, 0);
        strokeWeight(5);

        rect(gap + cardWidth + (gap * 2), gap, cardWidth, cardHeight, bvl / 1.5);

        fill(bgCol)
        rect(gap + cardWidth + (gap * 2) + 20, gap + 20, cardWidth - 40, cardHeight - 40, bvl / 1.5);

        fill(cardBg2Part2);
        rect(gap + cardWidth + (gap * 2) + 20, gap + 20 + (cardHeight / 2), cardWidth - 40, (cardHeight / 2) - 40, bvl / 1.5);

        push()

        textAlign(CENTER);
        textSize(32)
        rectMode(CENTER)
        fill(cardBg2)
        rect(gap + cardWidth + (gap * 2) + (cardWidth / 2), gap + (cardHeight / 2) + 10, cardWidth - 40, 55);
        fill(255, 255, 255);
        textStyle(BOLD)
        noStroke()
        text(card2Info.name, gap + cardWidth + (gap * 2) + (cardWidth / 2), gap + (cardHeight / 2) + 10 + 10);

        pop()


        push()

        imageMode(CENTER)
        rectMode(CENTER)
        stroke(20)
        fill(0, 0, 0, 0)
        var imgSize = 256 - (128 / 2)
        rect(gap + cardWidth + (gap * 2) + (cardWidth / 2), gap + ((cardHeight / 2)) / 2, imgSize, imgSize)
        noSmooth()
        image(card2Info.image, gap + cardWidth + (gap * 2) + (cardWidth / 2), gap + ((cardHeight / 2)) / 2, imgSize, imgSize)

        pop()

        // ATTRIBUTES

        // let attrWidth
        // let attrGap = 40

        push()
        fill(255, 255, 255);
        textStyle(BOLD)
        textStyle(BOLD)
        textSize(32)
        noStroke()
        text("Speed:", 
            gap + cardWidth + (gap * 2) + 35, 
            gap + (cardHeight / 2) + 80 + (attrGap * 0))
        attrWidth = 32
        // card2Info.attributes.speed = 5
        for (var i = 0; i < card2Info.attributes.speed; i++) {
            imageMode(TOP)
            noSmooth()
            image(attrSpeed, 
                ((gap + cardWidth + (gap * 2) + cardWidth) - 40 - (i * attrWidth)) - attrSpeed.width, 
                (gap + (cardHeight / 2) + 85) - (attrSpeed.height * 1), 
                attrWidth, attrWidth)
        }
        pop()


        push()
        fill(255, 255, 255);
        textStyle(BOLD)
        textStyle(BOLD)
        textSize(32)
        noStroke()
        text("Strength:", 
        gap + cardWidth + (gap * 2) + 35, 
            gap + (cardHeight / 2) + 80 + (attrGap * 1))
        attrWidth = 32
        // card2Info.attributes.strength = 5
        for (var i = 0; i < card2Info.attributes.strength; i++) {
            imageMode(TOP)
            noSmooth()
            image(attrStrength, 
                ((gap + cardWidth + (gap * 2) + cardWidth) - 40 - (i * attrWidth)) - attrStrength.width, 
                (gap + (cardHeight / 2) + 85 + (attrGap * 1)) - (attrStrength.height * 1), 
                attrWidth, attrWidth)
        }
        pop()


        push()
        fill(255, 255, 255);
        textStyle(BOLD)
        textStyle(BOLD)
        textSize(32)
        noStroke()
        text("Intelligence:", 
        gap + cardWidth + (gap * 2) + 35, 
            gap + (cardHeight / 2) + 80 + (attrGap * 2))
        attrWidth = 32
        // card2Info.attributes.intelligence = 5
        for (var i = 0; i < card2Info.attributes.intelligence; i++) {
            imageMode(TOP)
            noSmooth()
            image(attrIntelligence, 
                ((gap + cardWidth + (gap * 2) + cardWidth) - 40 - (i * attrWidth)) - attrIntelligence.width, 
                (gap + (cardHeight / 2) + 85 + (attrGap * 2)) - (attrIntelligence.height * 1), 
                attrWidth, attrWidth)
        }
        pop()


        push()
        fill(255, 255, 255);
        textStyle(BOLD)
        textStyle(BOLD)
        textSize(32)
        noStroke()
        text("Charisma:", 
        gap + cardWidth + (gap * 2) + 35, 
            gap + (cardHeight / 2) + 80 + (attrGap * 3))
        attrWidth = 32
        // card2Info.attributes.charisma = 5
        for (var i = 0; i < card2Info.attributes.charisma; i++) {
            imageMode(TOP)
            noSmooth()
            image(attrCharisma, 
                ((gap + cardWidth + (gap * 2) + cardWidth) - 40 - (i * attrWidth)) - attrCharisma.width, 
                (gap + (cardHeight / 2) + 85 + (attrGap * 3)) - (attrCharisma.height * 1), 
                attrWidth, attrWidth)
        }
        pop()


        push()
        fill(255, 255, 255);
        textStyle(BOLD)
        textStyle(BOLD)
        textSize(32)
        noStroke()
        text("Tech:", 
        gap + cardWidth + (gap * 2) + 35, 
            gap + (cardHeight / 2) + 80 + (attrGap * 4))
        attrWidth = 32
        // card2Info.attributes.tech = 5
        for (var i = 0; i < card2Info.attributes.tech; i++) {
            imageMode(TOP)
            noSmooth()
            image(attrTech, 
                ((gap + cardWidth + (gap * 2) + cardWidth) - 40 - (i * attrWidth)) - attrTech.width, 
                (gap + (cardHeight / 2) + 85 + (attrGap * 4)) - (attrTech.height * 1), 
                attrWidth, attrWidth)
        }
        pop()

        if (frameCount < endRandom) {
            resetCards()


            // push()
            // fill(255, 255, 255);

            // textStyle(BOLD)
            // textSize(32)
            // noStroke()
            // textAlign(CENTER)
            // text(`The winner will be selected on the ${SelectedCategory} of the chosen characters!`, width / 2, (height / 8) * 7)

            // pop()
        } else if (frameCount == endRandom) {
            OnCardResetSound.play()
        } else {
            // console

            drawWinner()
        }


        push()
        fill(255, 255, 255);

        textStyle(BOLD)
        textSize(16)
        noStroke()
        textAlign(CENTER)
        text(`The winner will be selected on the ${SelectedCategory} of the randomly selected characters!`, width / 2, (height / 16) * 15)

        pop()
    } 
    // else if (CurrentScreen == Screens.KEYBINDS) {
    //     push()

    //     let gap2 = 100

    //     fill(0, 100 - 20, 125 - 20)
    //     rect(gap2 / 2, gap2 / 2, windowWidth - (gap2), windowHeight - (gap2))

    //     fill(255, 255, 255);
    //     textStyle(BOLD)
    //     textSize(54)
    //     noStroke()
    //     textAlign(CENTER)
    //     text('Left and Right arrows:', gap2 * 3.5, (gap2) + 25)
    //     text('Left and Right arrows:', (gap2 * 2) + (windowWidth - (gap2)), (gap2) + 25)


    //     pop()
    // }
}

function keyPressed() {
    let CategoryKeys = Object.keys(Categories)
    let CategoryValues = Object.values(Categories)
    if (keyCode == 32) {
        // resetCards()
        if (endRandom < frameCount) endRandom = frameCount + 60

        // OnCardResetSound.play()
    } else if (keyCode == 37) {
        var catIndex = CategoryValues.indexOf(SelectedCategory)
        catIndex--;
        SelectedCategory = Categories[CategoryKeys[catIndex < 0 ? CategoryKeys.length - 1 : catIndex]]

        OnSelectSound.play()
    } else if (keyCode == 39) {
        var catIndex = CategoryValues.indexOf(SelectedCategory)
        catIndex++;
        SelectedCategory = Categories[CategoryKeys[catIndex > (CategoryKeys.length - 1) ? 0 : catIndex]]

        OnSelectSound.play()
    }
}

function resetCards() {
    cardBg1 = color(random(255), random(255), random(255))
    cardBg2 = color(random(255), random(255), random(255))

    cardBg1Part2 = color(random(255), random(255), random(255))
    cardBg2Part2 = color(random(255), random(255), random(255))

    card1Info = cardInfo[Math.floor(Math.random() * cardInfo.length)]
    card2Info = cardInfo[Math.floor(Math.random() * cardInfo.length)]
}

function loadCards() {
    const names = Object.keys(cardsJSON)
    for (let name of names) {
        cardInfo.push({
            name: name,
            attributes: cardsJSON[name].attributes,
            image: loadImage(`data/${names.indexOf(name) + 1}.png`)
        })
    }
}

function drawWinner() {
    push()

    if (SelectedCategory == Categories.SPEED) {
        if (card1Info.attributes.speed > card2Info.attributes.speed) {
            drawWinnerText(`${player1Name} has one this round!`)
        } else if (card1Info.attributes.speed < card2Info.attributes.speed) {
            drawWinnerText(`${player2Name} has one this round!`)
        } else {
            drawWinnerText(`It's a draw!`)
        }
    } else if (SelectedCategory == Categories.STRENGTH) {
        if (card1Info.attributes.strength > card2Info.attributes.strength) {
            drawWinnerText(`${player1Name} has one this round!`)
        } else if (card1Info.attributes.strength < card2Info.attributes.strength) {
            drawWinnerText(`${player2Name} has one this round!`)
        } else {
            drawWinnerText(`It's a draw!`)
        }
    } else if (SelectedCategory == Categories.INTELLIGENCE) {
        if (card1Info.attributes.intelligence > card2Info.attributes.intelligence) {
            drawWinnerText(`${player1Name} has one this round!`)
        } else if (card1Info.attributes.intelligence < card2Info.attributes.intelligence) {
            drawWinnerText(`${player2Name} has one this round!`)
        } else {
            drawWinnerText(`It's a draw!`)
        }
    } else if (SelectedCategory == Categories.CHARISMA) {
        if (card1Info.attributes.charisma > card2Info.attributes.charisma) {
            drawWinnerText(`${player1Name} has one this round!`)
        } else if (card1Info.attributes.charisma < card2Info.attributes.charisma) {
            drawWinnerText(`${player2Name} has one this round!`)
        } else {
            drawWinnerText(`It's a draw!`)
        }
    } else if (SelectedCategory == Categories.TECH) {
        if (card1Info.attributes.tech > card2Info.attributes.tech) {
            drawWinnerText(`${player1Name} has one this round!`)
        } else if (card1Info.attributes.tech < card2Info.attributes.tech) {
            drawWinnerText(`${player2Name} has one this round!`)
        } else {
            drawWinnerText(`It's a draw!`)
        }
    }

    pop()
}

function drawWinnerText(winnerText) {
    push()

    fill(255, 255, 255);

    textStyle(BOLD)
    textSize(32)
    noStroke()
    textAlign(CENTER)
    text(winnerText, width / 2, (height / 8) * 7)

    pop()
}