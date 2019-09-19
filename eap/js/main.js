var template = {
    title: 'JOIN THE FIRST DLT NETWORK WHICH ENABLES ALL DEVELOPERS TO PARTICIPATE IN THE DECENTRALISED COMPUTING REVOLUTION!',
    description: 'The Catalyst Network is a fast, light, secure and decentralised network that enables all developers to quickly develop and deploy dapps and smart contracts — without needing to invest time and money learning new programming languages. Use your existing skills to tap into a rapidly expanding market and join a growing community of developers working to bring blockchain technology into the mainstream.',
    socialCard: '',
    url: 'https:/catalystnet.org',
    twitter: '@CatalystNetOrg',
    metaTitle: 'Catalyst Developer Signup',
    metaDescription: '',
}


var countDownDate = new Date(template.date).getTime(), // The countdown is intentionally set 15 mins prior to the actual event
    countdown = document.getElementById('js-countdown');
    cta = document.getElementById('js-cta');
    title = document.getElementById('js-title');
    kicker = document.getElementById('js-kicker');
    deck = document.getElementById('js-deck');

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
