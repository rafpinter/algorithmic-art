import numpy as np
import json
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

from dotenv import load_dotenv

load_dotenv()


def get_song_id_metrics(song_id):
    song_audio = sp.audio_analysis(song_id)
    coords = []
    # print(len(song_audio["segments"]))
    for i in range(len(song_audio["segments"]) - 1):
        data = process_pitch(song_audio["segments"][i]["pitches"])
        data.extend([-song_audio["segments"][i]["loudness_max"]])
        coords.append(data)
    return coords


def process_pitch(pitch_list):
    min_max_list = normalize(pitch_list)
    coordinates = get_coordinates(min_max_list)
    coordinates = list(np.sum(coordinates, axis=0))
    return coordinates


def normalize(input_list):
    min_val = min(input_list)
    max_val = max(input_list)
    if max_val == min_val:
        return [0 for x in input_list]
    normalized_list = [(x - min_val) / (max_val - min_val) for x in input_list]
    return normalized_list


def get_coordinates(normalized_input):
    i = 0
    coordinates = []
    for i in range(len(normalized_input) - 1):
        cos = round(np.cos(i * 2 * np.pi / 12), 5) * normalized_input[0]
        sin = round(np.sin(i * 2 * np.pi / 12), 5) * normalized_input[1]
        coordinates.append((cos, sin))
    return coordinates


if __name__ == "__main__":
    import sys

    print(sys.argv)

    client_credentials_manager = SpotifyClientCredentials()
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

    song_id = "3gVXAW2pduBl7tzjAGUVRb"
    carousel_aa = sp.audio_analysis(song_id)

    ids_houses_of_holy = [
        sp.album_tracks("0GqpoHJREPp0iuXK3HzrHk")["items"][i]["id"]
        for i in range(len(sp.album_tracks("0GqpoHJREPp0iuXK3HzrHk")["items"]))
    ]

    database = {}
    for i, song_id in enumerate(ids_houses_of_holy):
        database[f"{i}"] = get_song_id_metrics(song_id)

    with open("songs.json", "w") as fp:
        json.dump(database, fp, indent=4)
