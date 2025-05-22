from flask import Flask, render_template,request,url_for,redirect
import os


import replicate
#API KEY=r8_VUbm6HIR5HAZXlm49hS8jZKsyS9y1CU2Oo7KL


# export REPLICATE_API_TOKEN=<API KEY>
os.environ['REPLICATE_API_TOKEN'] = 'r8_bjtfcxemDMjgm0ZErtosoeBkfzEDufn4FfU6M'



def CONTENT_GENERATE(prompt_query):
  ans_query = ''
  for event in replicate.stream(
    "meta/meta-llama-3.1-405b-instruct",
    input={
      "top_p": 0.9,
      "prompt": prompt_query,
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








# Assuming your Python script (LLM.py) is in the same directory as GOD_DEMON_IS_BACK and GPT_KA_BAAP folders
app = Flask(__name__, template_folder="D:\Raghav\EVOLUTION\GOD_DEMON_IS_BACK\GPT_KA_BAAP",static_folder="D:\Raghav\EVOLUTION\GOD_DEMON_IS_BACK\GPT_KA_BAAP")


def get_content(user_query):
    # Replace this with your logic to fetch content from a database, API, or any other source
    
    return user_query




@app.route('/index')
def index():
    
    return render_template("frontend.html")  # No need for the full path here


@app.route('/')
def home():
    
    return render_template("frontend.html")  # No need for the full path here



def user(name):  
    if name == '':  
        return redirect(url_for(''))  
    if name == 'index':  
        return redirect(url_for('index'))

    if name=='process_query':
        return redirect(url_for('process_query'))  




@app.route('/process_query', methods=['POST','GET'])

def process_query():
  if request.method == 'POST':
    user_query = request.form['QUESTION']

    

#     # Process the user query using your LLM (replace with your logic)
#     processed_data = llm.process(user_query)
    

    return render_template("frontend.html", content=CONTENT_GENERATE(user_query))

  # Handle potential errors (e.g., empty query)
  return render_template("frontend.html", content=get_content(user_query))





if __name__ == '__main__':
    app.run(debug=True)
