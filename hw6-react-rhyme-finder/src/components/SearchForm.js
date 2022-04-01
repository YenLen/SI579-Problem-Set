import'./SearchForm.css';
import {useState} from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SearchOutput from './SearchOutput.js' 

const SearchForm = (props) => {
    const [wordInput, setWordInput] = useState('');
    // below is fro output description
    const [message, setMessage] = useState('loading');
    const [displayList, setDisplayList] = useState([]);
    const [syllablesNum, setSyllablesNum] = useState([])

    const datamuseRequest = (url, callback) => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                // This invokes the callback that updates the page.
                callback(data);
            }, (err) => {
                console.error(err);
            });
    }

    const getDatamuseRhymeUrl = (rel_rhy) => {
        return `https://api.datamuse.com/words?${(new URLSearchParams({'rel_rhy': rel_rhy})).toString()}`;
    }

    const getDatamuseSimilarToUrl = (ml) => {
        return `https://api.datamuse.com/words?${(new URLSearchParams({'ml': ml})).toString()}`;
    }


    const groupBy = (objects, property) => {
            // If property is not a function, convert it to a function that accepts one argument (an object) and returns that object's
            // value for property (obj[property])
            if(typeof property !== 'function') {
                const propName = property;
                property = (obj) => obj[propName];
            }

            const groupedObjects = new Map(); // Keys: group names, value: list of items in that group
            for(const object of objects) {
                const groupName = property(object);
                //Make sure that the group exists
                if(!groupedObjects.has(groupName)) {
                    groupedObjects.set(groupName, []);
                }
                groupedObjects.get(groupName).push(object);
            }

            // Create an object with the results. Sort the keys so that they are in a sensible "order"
            const result = {};
            for(const key of Array.from(groupedObjects.keys()).sort()) {
                result[key] = groupedObjects.get(key);
            }
            return result;
        }

    const showRhymes = (event) => {
        let url = getDatamuseRhymeUrl(wordInput);
        datamuseRequest (url, response => {
            let data_group = groupBy(response, 'numSyllables')
            const totalList = []
            if (response.length === 0) {
                return setMessage('no result')
            } else {
                setMessage('')
                for (var key in data_group) {
                    // console.log(key)
                    totalList.push(`<h3>Syllables: ${key}</h3>`)
                    for (var i = 0; i < data_group[key].length; i++) {
                            let word = data_group[key][i]['word'];
                            totalList.push(`<li>${word}</li>`)                    
                    }
                }
                return totalList
            }
        })
        
    }


    const showSynonyms = (event) => {
        event.preventDefault();
    };
    const [WordOutput, setWordOutput] = useState(<h2>...loading</h2>);


    return (
        <div>
            <h1>Rhyme Finder (579 Problem Set)</h1>   

            <Form>
                <InputGroup>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter a word" value={wordInput}
                        onChange={(e) => setWordInput(e.target.value)} 
                        />
                    {/* create button for searching rhyming words*/}
                    <Button variant="primary" type="submit" onClick={showRhymes} >
                        Show rhyming words
                    </Button>

                    {/* create button for searching synonyms */}
                    <Button variant="secondary" type="submit" onClick={showSynonyms}>
                        Show synonyms
                    </Button>
                </InputGroup>
            </Form>
            
            <h2>Words that rhyme with {wordInput}:</h2>
            {message}
            {showRhymes(wordInput)}

           

            {
                // displayList.map( key => {
                //     return <div>                        
                //         {/* <li>{displayList}</li> */}
                //         <li> {key} </li>
                //     </div>
                // }
                // )
                // Object.keys(displayList).map( key => {
                //     return <div>

                //         <h3>Syllables:{key}</h3>
                        
                //         {/* <li>{displayList}</li> */}
                //         <li> {JSON.stringify(displayList[key])} </li>
                //     </div>
                // }
                // )
                // displayList.map(item => {
                //     return (<li> {item} </li>)
                // })
            }
            
        </div>

    );
    
}



// As always, we must export so others can import!
export default SearchForm;