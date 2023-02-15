var config = {
    style: 'mapbox://styles/gbby/cl4g7cfhv001n14qxgenegeqn',
    accessToken: 'pk.eyJ1IjoiZ2JieSIsImEiOiJjbDRnMnhpcWowOTZ0M2ltYmVidmFlYzUyIn0.YMvE-Zv6jfxhACw69xOvLQ',
    showMarkers: false,
    theme: 'light',
    use3dTerrain: true,
    title: "Patience at the Border",
    subtitle: '',
    byline: '',
    footer: 'Source: <a href="https://www.torontomu.ca/cerc-migration/">CERC Migration at Toronto Metropolitan University</a>',
    chapters: [{
            id: 'home',
            hidden: true,
            alignment: 'full',
            title: '',
            image: '',
            description: '<p style="color: red; font-size: 20px;">This is my first paragraph.</p>',
            location: {
                center: [0.47773, 7.15319],
                zoom: 7.00,
                pitch: 45.00,
                bearing: 0.00,
                speed: 0.2,
                curve: 1
            }
        },
        {
            id: 'home2',
            hidden: true
        },
        {
            id: 'patience',
            alignment: 'full',
            title: '',
            image: './video/cutcity.gif',
            description: '<center><i>“After I graduated from secondary school in 2003, I decided to travel to Nigeria because my uncle who lived in Lagos offered me a place to stay and a job as an apprentice in a tailor shop...”</i></center>',
            location: {
                center: [0.47401, 7.15187],
                zoom: 16.00,
                pitch: 45.00,
                bearing: 0.00,
                speed: 0.3,
                curve: 1
            }
        },
        {
            id: 'hohoe2003',
            hidden: true,
            alignment: '',
            title: '',
            image: '',
            description: ""
        },
        {
            id: 'hohoe2003a',
            alignment: 'left',
            title: 'Hohoe, Volta Region, Ghana',
            image: '',
            description: "Patience's journey began in 2003, when she left Hohoe Municipality, in Ghana's Volta Region. Prior to leaving, she lived in Hohoe with her siblings and parents, who are farmers. Hohoe is an administrative district with a population of over 100,000 people. It shares a border with Togo to the east."
        },

        {
            id: 'hohoe2003b',
            alignment: 'right',
            title: '',
            image: '',
            description: "Due to Hohoe's proximity to the Togo border, Patience had grown up alongside community members who crossed the border frequently for work. She also knew various people who traveled to work across more distant parts of the region, including an uncle who had moved to Lagos, Nigeria. The prospect of travel had frequently presented itself, and Patience dreamed of leaving Hohoe and living in a big city. In 2002, an opportunity arose when her uncle visited for Christmas and invited her to come to Lagos after graduating from Secondary School. He promised to provide both accommodation and employment for her in his shop."
        },
        {
            id: 'hohoe2003c',
            alignment: 'left',
            title: '',
            image: '',
            description: "When Patience graduated from school at the age of 17, plans to join her uncle in Lagos began to take shape. Her parents gave her money for a journey across countries, and her uncle sent instructions detailing how to get from Hohoe to Lagos. He advised her to acquire a passport and a yellow fever vaccination certificate, neither of which was difficult to get. She also needed to pool together enough money for her transportation, feeding, and various unforeseen expenses such as border-crossing fees. Patience would need to cross three borders to get to Lagos."
        },
        {
            id: 'hohoe2003d',
            alignment: 'right',
            title: '',
            image: '',
            description: "Patience left Hohoe by trotro, which transported her to the Aflao-Kodjoviakopé border between Ghana and Togo. Trotro are privately owned minibuses, minivans, and pickup trucks that operate like shared taxis, traveling fixed routes and leaving only when filled to capacity. Trotros are often crowded and can be uncomfortable, yet provide a convenient and affordable mode of transportation. Patience recalls that she didn't have any problem crossing the border because she had both the right documents and money to pay a border-crossing fee. Entering Togo was her first time in another country, and she recalls being surprised about having to pay money at the border even though she was told to expect it. She was nervous about traveling alone, but was also very excited to see what was beyond the border."
        },
        {
            id: 'lome2003a',
            hidden: true,
            alignment: '',
            title: '',
            image: '',
            description: "",
            location: {
                center: [1.21990, 6.12587],
                zoom: 15.00,
                pitch: 45.00,
                bearing: 0.00,
                speed: 0.5,
                curve: 1
            },
            onChapterEnter: [{
                    layer: 'patience',
                    opacity: 0.25
                },
                {
                    layer: 'patienceDark',
                    opacity: 0.75
                }
            ],
            onChapterExit: [{
                    layer: 'patience',
                    opacity: 0.8
                },
                {
                    layer: 'patienceDark',
                    opacity: 0
                }
            ]
        },
        {
            id: 'lome2003b',
            alignment: 'left',
            title: 'Lome, Togo',
            image: '',
            description: "After crossing into Togo, Patience changed some money from Ghanaian cedis to CFA and boarded another minibus heading towards Lome, the largest city in Togo, and the Sanve Kondji-Hillacondji border between Togo and Benin Republic. At the border, she was asked to show her passport and health certificate and, again, she was required to pay a fee to the officers. She had spent about half of the money given to her for transportation at this point. From the Togo-Benin border, she boarded another bus to Cotonou, the largest city in Benin Republic."
        },
        {
            id: 'cotonou2013',
            hidden: true,
            alignment: '',
            title: '',
            image: '',
            description: "",
            location: {
                center: [2.39007, 6.37056],
                zoom: 16.00,
                pitch: 45.00,
                bearing: 0.00,
                speed: 0.5,
                curve: 1
            }
        },
        {
            id: 'cotonou2013a',
            alignment: 'right',
            title: 'Cotonou, Benin',
            image: '',
            description: "In Cotonou, Patience boarded a bus headed toward Nigeria..."
        },
        {
            id: 'seme2013a',
            hidden: true,
            location: {
                center: [2.70558, 6.38595],
                zoom: 15.00,
                pitch: 45.00,
                bearing: 0.00,
                speed: 0.5,
                curve: 1
            },
        },
        {
            id: 'seme2013b',
            alignment: 'left',
            title: 'Seme-Krake Border',
            image: '',
            description: "The Seme-Krake border between Benin Republic and Nigeria is one of the busiest crossings in the region. When Patience arrived, there was a long queue of cross-border traders and business people who enter Nigeria daily to trade and do business. Crossing each day is expensive, and those who cannot pay the fees at the border are often turned away, face delays, or are harassed. Patience was asked to show her passport and health certificate, and then asked to pay yet another fee. At this point, most of the cash she was carrying had run out, but her passport was stamped and she was allowed to enter the country.",
            location: {
                center: [2.705284359806152, 6.379854679264657],
                zoom: 15.00,
                pitch: 45.00,
                bearing: 0.00,
                speed: 0.5,
                curve: 1
            }
        },
        // {
        //     id: 'seme2013c',
        //     alignment: '',
        //     title: '',
        //     image: '',
        //     description: "Freedom of Movement indicator: Patience has an ECOWAS passport and this has made traveling between Ghana, Togo, Benin and Nigeria relatively easier for her. However, she says that her biggest challenge is having to pay money at the Aflao-Kodjoviakopé border, the Sanve Kondji- Hillacondji border, and at the Seme- Krake border to immigration officials even though she has a passport. There is both a formal and informal border between Krake and Seme and entry and exit at the formal border is possible  for Patience because of her passport.  Having a passport determines how one crosses the border. People with passports can enter with cars or on foot, whereas, those without passports often rely on informal paths on okada (public bike transportation) or on foot."
        // },
        {
            id: 'badagry2013a',
            alignment: '',
            title: '',
            image: './images/border.jpg',
            description: "<i>“When we got to Seme border, they asked me for my passport and what I am coming to Nigeria to do. It was not a difficult experience to pass the border, but we had to pay money to officers at the border. After I arrived, I was staying with my uncle in Lagos for five years.”</i> <br> <br> <b>Freedom of Movement indicator:</b> Patience has an ECOWAS passport, and this has made traveling between Ghana, Togo, Benin, and Nigeria relatively easy for her. However, she says that having to pay money to immigration officials at the Aflao-Kodjoviakopé, Sanve Kondji-Hillacondji, and Seme-Krake borders is a significant barrier despite her possessions of an ECOWAS passport. There is both a formal and informal border between Krake and Seme, and entry and exit at the formal border is possible for Patience because of her passport. Having a passport determines how one crosses the border, and those with passports can enter in cars or on foot. Those without passports often rely on informal foot or okada (public bike transportation) paths.",
            location: {
                center: [2.705284359806152, 6.379854679264657],
                zoom: 15.00,
                pitch: 45.00,
                bearing: 0.00,
                speed: 0.5,
                curve: 1
            }
        },
        {
            id: 'badagry2013b',
            alignment: 'left',
            title: 'Badagry, Lagos Region, Nigeria',
            image: '',
            description: "After crossing the last border in her long journey, Patience changed her CFA notes to Nigerian naira, then stoppd at a phone booth to call her uncle. He gave her directions to board a danfo - a public bus similar to the trotros in Ghana - headed in the direction of Badagry, a coastal town in Lagos where people coming from the border must pass through. There were other immigration stops between Seme and Badagry, and Patience learned from other passengers to negotiate with officers in order to avoid running out of money. She arrived in Badagry, and then found a bus towards Aguda, Surulere, the area in Lagos where her uncle lived. Lagos is the most populous city in Africa, and Patience recalls feeling overwhelmed by the number of people when she first arrived, even though she enjoyed the bustling sights and sounds of the city.",
            location: {
                center: [2.8901, 6.4183],
                zoom: 15.00,
                pitch: 45.00,
                bearing: 0.00,
                speed: 0.5,
                curve: 1
            }
        },
        {
            id: 'aguda2013a',
            hidden: true,
            alignment: '',
            title: '',
            image: '',
            description: "",
            location: {
                center: [3.3414, 6.4900],
                zoom: 15.00,
                pitch: 45.00,
                bearing: 0.00,
                speed: 0.8,
                curve: 1
            }
        },
        {
            id: 'aguda2013b',
            alignment: 'right',
            title: 'Aguda, Lagos Region, Nigeria',
            image: '',
            description: "When she arrived in Aguda, her uncle picked her up from the bus stop. Aguda is a suburb in Surulere local government area, and was, at the time, one of the areas where Ghanaians from Patience's community had settled. From 2003-2008, Patience lived with there her uncle and worked at a thriving tailor shop where she learned how to sew women's clothing.",
            location: {
                center: [3.3414, 6.4900],
                zoom: 15.00,
                pitch: 45.00,
                bearing: 0.00,
                speed: 0.5,
                curve: 1
            }
        },
        {
            id: 'return',
            alignment: '',
            title: 'A Short Return to Ghana...',
            image: '',
            description: "In 2009, Patience decided to return to Ghana. She felt confident about her tailoring skills after receiving five years of training, and she had saved up some money. At the same time, her sister moved to Accra from Hohoe, and she was excited about the prospect of joining her sister and living in Ghana's largest city. With her sister's help, she got a job as a seamstress. Her uncle also made plans to return to Ghana, so it seemed like a good time for her to return.",
            location: {
                center: [-0.1870, 5.6037],
                zoom: 15.00,
                pitch: 45.00,
                bearing: 0.00,
                speed: 0.5,
                curve: 1
            }
        },
        {
            id: 'ghana2009a',
            hidden: true,
            alignment: '',
            title: '',
            image: '',
            description: ""
        },
        {
            id: 'ghana2009b',
            alignment: 'left',
            title: 'Accra, Ghana',
            image: '',
            description: "From 2009 to 2012, Patience worked in Accra and lived with her sister. While she enjoyed working in Accra, she was dissatisfied with her skills and felt a need to improve them. Another opportunity surfaced, drawing her back to Lagos in order to work as an apprenctice with a popular tailor who was well known for his trendy styles. Patience liked the style of this tailor's work, and wanted to learn it and bring it back to Ghana. By 2012, when she embarked on her journey back to Lagos, she found that travel requirements had changed since she left Nigeria the first time. There were more checkpoints between Ghana and Togo, Togo and Benin, and Benin and Nigeria. More checkpoints meant stricter immigration procedures, as well as higher fees to pay to border officials."
        },
        {
            id: 'lagos2009a',
            hidden: true,
            alignment: '',
            title: '',
            image: '',
            description: "",
            location: {
                center: [3.3087, 6.5355],
                zoom: 15.00,
                pitch: 45.00,
                bearing: 0.00,
                speed: 0.5,
                curve: 1
            }
        },
        {
            id: 'lagos2009b',
            alignment: 'right',
            title: 'Isolo, Lagos Region, Nigeria',
            image: './images/isolo.jpg',
            description: "Returning to Lagos in 2012, Patience found that things were not as easy as before since her Uncle had left Nigeria. She could not return to Aguda, and had to move to Isolo to live in the shop where she worked as an apprentice. Isolo is a small town located in the Oshodi-Isolo local government area of Lagos, and is another place where migrants from Ghana and Togo frequently settle.",
            location: {
                center: [3.3087, 6.5355],
                zoom: 15.00,
                pitch: 45.00,
                bearing: 0.00,
                speed: 0.5,
                curve: 1
            }
        },
        {
            id: 'lagos2009c',
            alignment: '',
            title: '',
            image: './images/hand.jpg',
            description: "<i>“I was homeless for a long time because my Uncle left. I called the tailor and told him that I want to work with him, and he is the one I stayed with for a while. I lived in his shop in Isolo. When he started having rental challenges, he could no longer provide accommodation for me. I had to find a way out. It was very difficult. I had to find an affordable place to stay quickly, and this is how I ended up remaining here in Isolo.”</i>"
        },
        {
            id: 'lagos2009d',
            alignment: '',
            title: '',
            image: './images/apprentice.jpg',
            description: "In 2012, Patience settled in Isolo, where she has remained ever since. She established her own tailoring business in 2015, with renewed confidence from three years of apprenticeship. She was able to save up money to rent her own shop where she currently has apprentices from Nigeria, Ghana, and Togo who live and work together. According to her, it was not easy to establish her business in Lagos, and she has struggled with generating the capital necessary to keep her business afloat. Patience chose to stay in Lagos, though, because she had an established customer base, and she didn't feel like starting over somewhere else. The long journey to Lagos allowed her to build her life to a point where she now employs others, but it has not been without challenges. <br> <br> <i>“I don’t belong to any community yet. Here in Isolo, there is a Togolese community, not a Ghanaian one. It was only once my uncle took me to a Ghanaian community meeting in Surulere when he was still in Nigeria. There were many people in the meeting. It is a meeting for the big (rich) Ghanaians, so I don’t think I can be a part of it. I see myself as someone that has not reached that level, but they are forcing me to join.”</i>"
        },
        // {
        //     id: 'lagos2009e',
        //     alignment: '',
        //     title: '',
        //     image: '',
        //     description: ""
        // },
        {
            id: 'lagos2009f',
            alignment: '',
            title: '',
            image: './images/apprentice2.jpg',
            description: "Patience used to send money home to her family, but she is no longer able to do so because of an economic downturn. She makes it a priority to visit Ghana, though, since she's not able to send as much money as before. Currently, her work is the only thing keeping her in Lagos. If she had a chance, she would return to home now that all of her family is back in Ghana. She also feels that Ghana has greater access to amenities like electricity, water, and security, although she thinks that food is cheaper and better in Nigeria. For now, Patience believes she will remain in Lagos despite the challenges she faces in settling and doing business there."
        },
        {
            id: 'lagos2009g',
            alignment: 'full',
            title: '',
            image: './video/sew.gif',
            description: "<i>“I do not face discrimination, but sometimes I have been told I am a foreigner, and some people do things to frustrate me, especially if they know you do not have networks or family to support you. These are challenges that are everywhere. Even in my own place in Ghana, you can get insulted for not being an indigene. But if you know what you want, you close your eyes and face it. I tried to bring people from Ghana to work with me here, but they don't want to come to Nigeria. They are afraid. I was also afraid of Nigeria before I came here, but after I decided to come here, I realized there was no harm in trying. I close my eyes and keep going. They say if you stay in Nigeria, there is no place in this world that you cannot stay.”</i>"
        },
    ]
}
