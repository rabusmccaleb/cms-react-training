import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Comic from "../pages/components/Comic";

const comicItem = {
    "id": 59560,
    "digitalId": 0,
    "title": "Uncanny Inhumans (2015) #12 (Land Mighty Men Variant)",
    "issueNumber": 12,
    "variantDescription": "Land Mighty Men Variant",
    "description": null,
    "modified": "2016-07-15T14:25:05-0400",
    "isbn": "",
    "upc": "75960608181301221",
    "diamondCode": "",
    "ean": "",
    "issn": "",
    "format": "Comic",
    "pageCount": 32,
    "textObjects": [],
    "resourceURI": "http://gateway.marvel.com/v1/public/comics/59560",
    "urls": [
        {
            "type": "detail",
            "url": "http://marvel.com/comics/issue/59560/uncanny_inhumans_2015_12_land_mighty_men_variant/land_mighty_men_variant?utm_campaign=apiRef&utm_source=31bca0b4b320ad36938f4430a0715fbf"
        }
    ],
    "series": {
        "resourceURI": "http://gateway.marvel.com/v1/public/series/19780",
        "name": "Uncanny Inhumans (2015 - 2017)"
    },
    "variants": [
        {
            "resourceURI": "http://gateway.marvel.com/v1/public/comics/52870",
            "name": "Uncanny Inhumans (2015) #12"
        },
        {
            "resourceURI": "http://gateway.marvel.com/v1/public/comics/60094",
            "name": "Uncanny Inhumans (2015) #12 (Tolibao Death of X Variant)"
        }
    ],
    "collections": [],
    "collectedIssues": [],
    "dates": [
        {
            "type": "onsaleDate",
            "date": "2029-12-31T00:00:00-0500"
        },
        {
            "type": "focDate",
            "date": "2016-07-06T00:00:00-0400"
        }
    ],
    "prices": [
        {
            "type": "printPrice",
            "price": 3.99
        }
    ],
    "thumbnail": {
        "path": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
        "extension": "jpg"
    },
    "images": [
        {
            "path": "http://i.annihil.us/u/prod/marvel/i/mg/7/30/56f466505ff5f",
            "extension": "jpg"
        }
    ],
    "creators": {
        "available": 2,
        "collectionURI": "http://gateway.marvel.com/v1/public/comics/59560/creators",
        "items": [
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/creators/425",
                "name": "Greg Land",
                "role": "penciller (cover)"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/creators/4300",
                "name": "Nick Lowe",
                "role": "editor"
            }
        ],
        "returned": 2
    },
    "characters": {
        "available": 0,
        "collectionURI": "http://gateway.marvel.com/v1/public/comics/59560/characters",
        "items": [],
        "returned": 0
    },
    "stories": {
        "available": 2,
        "collectionURI": "http://gateway.marvel.com/v1/public/comics/59560/stories",
        "items": [
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/stories/129626",
                "name": "cover from Uncanny Inhumans (2015) #12 (LAND MOP VARIANT)",
                "type": "cover"
            },
            {
                "resourceURI": "http://gateway.marvel.com/v1/public/stories/129627",
                "name": "story from Uncanny Inhumans (2015) #12 (LAND MOP VARIANT)",
                "type": "interiorStory"
            }
        ],
        "returned": 2
    },
    "events": {
        "available": 0,
        "collectionURI": "http://gateway.marvel.com/v1/public/comics/59560/events",
        "items": [],
        "returned": 0
    }
}
const date = (comicItem && comicItem.publishDate) ? new Date(comicItem.publishDate) : undefined;

describe("<Comic/> Component test", () => {
    it("renders a Comic Component", () => {
    render(
            <Comic
                key={(Math.random() * Math.random() * 100)} 
                href={(comicItem.urls && comicItem.urls.length) ? comicItem.urls[0].url : ""}
                thumbnail={`${comicItem.thumbnail.path}/portrait_incredible.${comicItem.thumbnail.extension}`} 
                title={comicItem.title} 
                issueNumber={`${comicItem.issueNumber}`} 
                publishDate={date}
                creators={comicItem.creators.items}
                description={comicItem.description ? comicItem.description : ""}
            />
        )
    });
});