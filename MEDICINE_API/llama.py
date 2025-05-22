from flask import Flask, render_template, request, jsonify
import os
import requests
import replicate
# Set the REPLICATE_API_TOKEN environment variable
os.environ['REPLICATE_API_TOKEN'] = 'r8_DJccsNaNXQprZHpup7E2F3UiErtCDTi006Eq0'

app = Flask(__name__, template_folder="D:/Raghav/EVOLUTION/GOD_DEMON_IS_BACK/MEDICINE_API",
            static_folder="D:/Raghav/EVOLUTION/GOD_DEMON_IS_BACK/MEDICINE_API")

# Function to generate content using Replicate's LLaMA API
def llama_api_request(prompt):

    ans_query = ''
    for event in replicate.stream(
        "meta/meta-llama-3.1-405b-instruct",
        input={
        "top_p": 0.9,
        "prompt": f"Give details of this medicine: {prompt}",
        "max_tokens": 1024,
        "min_tokens": 0,
        "temperature": 0.6,
        "system_prompt": "You are a helpful assistant.",
        "presence_penalty": 0,
        "frequency_penalty": 0
        },
    ):
        ans_query += str(event)
        print(str(event), end="")
    return ans_query  # Return the final ans_query
   

@app.route('/llama-api', methods=['POST'])
def llama_api():
    data = request.json
    text = data.get('text', '')

    if text:
        llama_response = llama_api_request(text)
        print(str(llama_response), end="")
        return jsonify({'response': llama_response})
    else:
        return jsonify({'error': 'No text provided for LLaMA API.'}), 400

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('medicine.html')

if __name__ == '__main__':
    app.run(debug=True)
