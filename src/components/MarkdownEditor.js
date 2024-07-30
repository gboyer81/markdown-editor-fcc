import React, { useEffect, useState } from 'react'

import { Marked } from 'marked'
import file from '../data/mdStr.md'
import hljs from 'highlight.js'
import { markedHighlight } from 'marked-highlight'
import styles from './MarkdownEditor.module.css'

const MarkdownEditor = () => {
	const marked = new Marked(
		markedHighlight({
			langPrefix: 'hljs language-',
			highlight: (code, lang, info) => {
				const language = hljs.getLanguage(lang) ? lang : 'plaintext'
				return hljs.highlight(code, { language }).value
			}
		})
	)
	const [markdown, setMarkdown] = useState('')

	useEffect(() => {
		fetch(file)
			.then(res => res.text())
			.then((text => setMarkdown(text)))
	}, [])

	const handleChange = (e) => {
		setMarkdown(e.target.value)
		console.log(markdown)
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.editor} id="editor">
				<textarea value={markdown} onChange={handleChange}></textarea>
			</div>
			<div className={styles.preview} id='preview'
      dangerouslySetInnerHTML={{__html: marked.parse(markdown)}}
    />
		</div>
	)
}

export default MarkdownEditor;