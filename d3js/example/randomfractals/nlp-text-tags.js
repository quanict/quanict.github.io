const tagColors = ({
    Pronoun: '#81acce',
    Verb: 'palevioletred',
    Adverb: '#f39c73',
    Adjective: '#b3d3c6',
    Determiner: '#d3c0b3',
    Preposition: '#9794a8',
    Conjunction: '#c8c9cf',
    QuestionWord: 'lavender',
    Noun: '#7990d6',
    Expression: '#b3d3c6',
    Value: 'palegoldenrod',
}),
tagTypes = [
    'Expression',
    'Pronoun',
    'Noun',
    'Verb',
    'Adjective',
    'Adverb',
    'Conjunction',
    'Preposition',
    'Determiner',
    'QuestionWord',
    'Value',
];

const tagLegends = ()=>{
    return `<p class="term">
      ${tagTypes.map(type => `<span class="nl-${type}" title="${type}">${type}</span> `)
            .reduce((html, tag) => html + tag)}
    </p>`
};