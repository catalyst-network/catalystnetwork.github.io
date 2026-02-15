var template = {
    title: 'Get involved with Catalyst Network',
    description: 'Catalyst is a decentralization-first blockchain. If you want to build, test, or help operate the network, use the links below to find the explorer, the development plan, GitHub repos, and the community.',
    socialCard: '',
    url: 'https://catalystnet.org/eap/',
    twitter: '@CatalystNetOrg',
    metaTitle: 'Catalyst Network - Get Involved',
    metaDescription: 'Links for developers and node operators: development plan, explorer, GitHub, and community.',
}


var cta = document.getElementById('js-cta');
var title = document.getElementById('js-title');
var deck = document.getElementById('js-deck');

    title.innerHTML = template.title;

    // Set metadata
    // Twitter
    document.querySelector('meta[name="twitter:site"]').setAttribute("content", template.twitter);
    document.querySelector('meta[name="twitter:creator"]').setAttribute("content", template.twitter);
    document.querySelector('meta[name="twitter:title"]').setAttribute("content", template.metaTitle);
    document.querySelector('meta[name="twitter:description"]').setAttribute("content", template.metaDescription);
    document.querySelector('meta[name="twitter:image"]').setAttribute("content", template.socialCard);
    //Open Graph
    document.querySelector('meta[property="og:url"]').setAttribute("content", template.url);
    document.querySelector('meta[property="og:title"]').setAttribute("content", template.metaTitle);
    document.querySelector('meta[property="og:description"]').setAttribute("content", template.metaDescription);
    document.querySelector('meta[property="og:image"]').setAttribute("content", template.socialCard);

var x = setTimeout(function() {
    deck.innerHTML = template.description;

    title.classList.add('fade-in');
    deck.classList.add('fade-in');
    cta.classList.add('fade-in');

},
1000);
