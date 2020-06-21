from flask import Flask,request
import numpy as np
import pandas as pd
import pickle

app = Flask(__name__)
pickle_in = open('classifier.pkl','rb')
classifier = pickle.load(pickle_in)

@app.route('/')
def welcome():
	return "Welcome"

@app.route('/predict')
def predict():
	variance = request.args.get('variance')
	skewness = request.args.get('skewness')
	curtosis = request.args.get('curtosis')
	entropy = request.args.get('entropy')
	prediction = classifier.predict([[variance,skewness,curtosis,entropy]])
	return "Prediction "+str(prediction)


@app.route('/predict_file',methods=['POST'])
def predict_file():
	df_test = pd.read_csv(request.files.get("file"))
	prediction = classifier.predict(df_test)
	return "Prediction "+str(list(prediction))



if __name__=='__main__':
	app.run()