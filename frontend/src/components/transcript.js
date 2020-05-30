import React, { useState } from 'react';
import { TinySegmenter } from './tiny_segmenter'

const segmenter = new TinySegmenter();

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition();

recognition.lang = 'ja-JP';					// 日本語対応
recognition.interimResults = true;  // 発言の途中でも認識結果を得ることができる
recognition.continuous = true;			// 認識する時間を半永久的に
recognition.start();								// 認識スタート

const Transcript = () => {
	const [ alertMessage, setAlertMessage ] = useState('')
	return <App alertMessage={ alertMessage} setAlertMessage={setAlertMessage} />
}

function App(props) {
	const [talk, setTalk] = useState('')
	const [result, setResult] = useState('')

	const { alertMessage, setAlertMessage } = props

	let finalTranscript = '';
	let pattern = ["です", "ます"];

	recognition.onresult = (event) => {
		let interimTranscript = '';
		setAlertMessage('');
		for (let i = event.resultIndex; i < event.results.length; i++) {
			let transcript = event.results[i][0].transcript;
			if (event.results[i].isFinal) {
				finalTranscript += transcript;
			} else {
				interimTranscript = transcript;
				setTalk(interimTranscript)
			}
		}
		let text = segmenter.segment(finalTranscript).join(" | ")
		if (text) setResult([...result, text])
		
		for (let i = 0; i < pattern.length; i++) {
			if (interimTranscript.indexOf(pattern[i]) > -1) {
				setAlertMessage('注意してください');
			}
		}
	}

	return (
		<div className="App">
			<div id="alert-message"><p style={{ color: 'red' }}>{alertMessage}</p></div>
			<div id="result-div">{result} <span style={{ color: '#ddd' }}>{talk}</span></div>
		</div>
	);
}

export default Transcript;
