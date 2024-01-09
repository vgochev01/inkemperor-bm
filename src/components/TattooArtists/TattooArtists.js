import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import CustomForm from '../CustomForm/CustomForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPalette, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import * as artistService from '../../services/artistService';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import './TattooArtists.scss';
import { isMobile } from 'react-device-detect';

const TattooArtists = ({ artists, setArtists }) => {
    const { accessToken } = useAuth();
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [artistData, setArtistData] = useState({
        name: '',
        color: '#27a082' // Default color
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setArtistData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleColorInputChange = (artistId, newColor) => {
        // Update the local state with the new color
        setArtists(artists.map(artist => artist._id === artistId ? { ...artist, color: newColor } : artist));
    };

    const handleColorPickerChange = (artistId, e) => {
        const newColor = e.target.value;
        handleColorInputChange(artistId, newColor);
    };

    const handleColorPickerBlur = (artistId, e) => {
        const newColor = e.target.value;
        artistService.updateArtistColor(artistId, newColor, accessToken)
            .then(updatedArtist => {
                setArtists(currentArtists => {
                    return currentArtists.map(artist => {
                        if (artist._id === artistId) {
                            return updatedArtist;
                        }
                        return artist;
                    });
                });
            })
            .catch(err => {
                setError(err.message || 'Something went wrong! Please try again later');
            });
    };

    const removeArtist = artistId => {
        artistService.removeArtist(artistId, accessToken)
            .then(resData => {
                if(resData.success) {
                    setArtists(artists.filter(artist => artist._id !== artistId));
                }
            })
            .catch(err => {
                alert(err.message);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        artistService.createArtist(artistData, accessToken)
            .then(newArtist => {
                setArtists(artists => [...artists, newArtist]);
            })
            .catch(err => {
                alert(err.message);
            });
    };

    const fields = [
        {
            controlId: 'artistName',
            label: 'Tattoo Artist Name',
            icon: faUser,
            type: 'text',
            name: 'name',
            inputProps: {
                value: artistData.name,
                onChange: handleInputChange
            }
        },
        {
            controlId: 'artistColor',
            label: 'Event Color',
            icon: faPalette,
            type: 'color',
            name: 'color',
            inputProps: {
                value: artistData.color,
                onChange: handleInputChange
            }
        }
    ];

    // useEffect(() => {
    //     artistService.getTattooArtists(accessToken)
    //         .then(data => setArtists(data))
    //         .catch(err => console.log(err.message));
    // }, [accessToken, setArtists]);

    return (
        <Container id="tattooArtists" className={!isMobile && 'py-5'} fluid>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <h4>Current Tattoo Artists</h4>
                        </Card.Header>
                        <Card.Body>
                            {artists.length === 0 ? <p>There are currently not any tattoo artists created.</p> :
                                <Container fluid>
                                    <Row className='my-3'>
                                        <Col className='p-0'>
                                            <Form>
                                                <InputGroup>
                                                    <InputGroup.Text>
                                                        <FontAwesomeIcon icon={faSearch} />
                                                    </InputGroup.Text>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Search Tattoo Artists"
                                                        value={searchTerm}
                                                        onChange={e => setSearchTerm(e.target.value)}
                                                    />
                                                </InputGroup>
                                            </Form>
                                        </Col>
                                    </Row>
                                    {searchTerm !== '' && artists.filter(artist => artist.name.toLowerCase().includes(searchTerm.toLowerCase())).map(artist => (
                                        <Row key={artist._id} className="artist">
                                            <Col className='p-0 align-self-center artist-name'>{artist.name}</Col>
                                            <Col className='p-0 d-flex align-items-center justify-content-end'>
                                                <Link to={`/?artist=${artist._id}`} className='artist-events'>Events</Link>
                                                <input
                                                    type="color"
                                                    name="color"
                                                    value={artist.color}
                                                    onChange={(e) => handleColorPickerChange(artist._id, e)} // Update local state
                                                    onBlur={(e) => handleColorPickerBlur(artist._id, e)} // Send update on blur
                                                    className="artist-color-picker"
                                                />
                                                <Button variant="outline-danger" onClick={() => removeArtist(artist._id)}>
                                                    <FontAwesomeIcon icon={faTimes} />
                                                </Button>
                                            </Col>
                                        </Row>
                                    ))}
                            </Container>
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <h4>Add New Tattoo Artist</h4>
                        </Card.Header>
                        <Card.Body>
                            <CustomForm fields={fields} onSubmit={handleSubmit} error={error} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default TattooArtists;