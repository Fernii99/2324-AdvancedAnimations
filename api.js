
 const URL = 'https://api.sampleapis.com/coffee/hot';

  

export const getCoffees = async () => {
    try{
        let response = await fetch(URL)
        let json = await response.json()
        const coffees = json.map( 
            ({
                id,
                title,
                description,
                image,
            }) => ({
                key: String(id),
                title: title,
                description: description,
                image: image
            })
        )
        // const movies = json.titles.map( 
        //     ({
        //         id,
        //         original_title,
        //         poster_path,
        //         backdrop_path,
        //         vote_average,
        //         overview,
        //         release_date,
        //         genre_ids,
        //     }) => ({
        //         key: String(id),
        //         originalTitle: original_title,
        //         posterPath: `https://image.tmdb.org/t/p/w500${poster_path}`,
        //         backdropPath: `https://image.tmdb.org/t/p/w500${backdrop_path}`,
        //         voteAverage: vote_average,
        //         description: overview,
        //         releaseDate: release_date,
        //         genres: genre_ids.map(id => GENRES[id])
        //     })
        // )
        return coffees
    }
    catch (error) {
        console.error(error);
    }

}