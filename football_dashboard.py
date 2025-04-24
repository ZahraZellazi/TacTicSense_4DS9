import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from scipy.spatial import ConvexHull
from datetime import datetime
import csv

# Load the CSV data for display and processing
def load_data():
    with open('detections.csv', mode='r') as file:
        reader = csv.DictReader(file)
        data = list(reader)
    return data

# Function to generate zone heatmap
def generate_heatmap(data):
    # Initialize the heatmap grid
    pitch_width, pitch_height = 600, 400
    heatmap_data = np.zeros((pitch_height, pitch_width), dtype=np.uint8)

    for row in data:
        if row['Position X'] and row['Position Y']:
            x, y = float(row['Position X']), float(row['Position Y'])
            x_mapped = int((x / 1000) * pitch_width)
            y_mapped = int((y / 550) * pitch_height)
            heatmap_data[y_mapped, x_mapped] += 1

    # Create heatmap visualization
    plt.imshow(heatmap_data, cmap='hot', interpolation='nearest')
    plt.title("Player Zone Heatmap")
    plt.colorbar()
    st.pyplot(plt)

# Function to display player statistics
def player_stats(data):
    player_ids = set([row['Player ID'] for row in data if row['Player ID']])
    player_data = {player_id: {'speed': 0, 'positions': []} for player_id in player_ids}

    for row in data:
        player_id = row['Player ID']
        if player_id:
            player_data[player_id]['positions'].append((float(row['Position X']), float(row['Position Y'])))
            player_data[player_id]['speed'] = float(row['Player Speed (km/h)'])  # Using speed from CSV

    # Display stats for each player
    for player_id, stats in player_data.items():
        st.subheader(f"Player ID: {player_id}")
        st.write(f"Speed: {stats['speed']} km/h")
        st.write(f"Number of positions: {len(stats['positions'])}")

# Function to display key events (e.g., speed spikes)
def key_events(data):
    speed_spikes = []
    for row in data:
        if row['Ball Speed (km/h)']:
            speed = float(row['Ball Speed (km/h)'])
            if speed > 50:  # Arbitrary threshold for speed spikes
                time = row['Time']
                speed_spikes.append((time, speed))
    
    if speed_spikes:
        st.subheader("Speed Spikes Detected")
        for event in speed_spikes:
            st.write(f"Time: {event[0]} | Speed: {event[1]} km/h")

# Function to show pass movement arrows
def pass_movement_arrows(data):
    ball_positions = [(float(row['Position X']), float(row['Position Y'])) for row in data if row['Ball Speed (km/h)']]
    if len(ball_positions) > 1:
        st.subheader("Ball Movement Arrows")
        fig, ax = plt.subplots(figsize=(10, 6))
        ax.set_xlim(0, 600)
        ax.set_ylim(0, 400)
        for i in range(1, len(ball_positions)):
            start_pos = ball_positions[i-1]
            end_pos = ball_positions[i]
            ax.arrow(start_pos[0], start_pos[1], end_pos[0] - start_pos[0], end_pos[1] - start_pos[1],
                     head_width=5, head_length=10, fc='blue', ec='blue')
        st.pyplot(fig)

# Main Streamlit App
def main():
    st.title("Football Tactical Analysis Dashboard")

    # Load data
    data = load_data()

    # Sidebar options
    option = st.sidebar.selectbox("Choose an analysis", ("Zone Heatmap", "Player Stats", "Key Events", "Pass Movement Arrows"))

    # Display based on selected option
    if option == "Zone Heatmap":
        generate_heatmap(data)
    elif option == "Player Stats":
        player_stats(data)
    elif option == "Key Events":
        key_events(data)
    elif option == "Pass Movement Arrows":
        pass_movement_arrows(data)

# Run Streamlit app
if __name__ == "__main__":
    main()
