import replicate
import os
#API KEY=r8_bjtfcxemDMjgm0ZErtosoeBkfzEDufn4FfU6M


# export REPLICATE_API_TOKEN=<API KEY>
os.environ['REPLICATE_API_TOKEN'] = 'r8_bjtfcxemDMjgm0ZErtosoeBkfzEDufn4FfU6M'


pr=input("ENTER QUERY:\t")



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

# Call the function and print the answer
answer = CONTENT_GENERATE(pr)
print(answer)