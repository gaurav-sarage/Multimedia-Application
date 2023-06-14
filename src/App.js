import React, { useState, useEffect } from 'react';
import { data } from './data';
import { Header } from "./components/Header";
import { AudioPlayer } from './components/AudioPlayer';
import { DocumentViewer } from './components/DocumentViewer';
import { VideoPlayer } from './components/VideoPlayer';
import { ImageViewer } from './components/ImageViewer';
export default function App() {
const [myFiles, setMyFiles] = useState([])
 const [selectedFile, setSelectedFile] = useState(null)
 const [filePath, setFilePath] = useState("/file-server/")
 const [showChartModal, setShowChartModal] = useState(false)
 
 useEffect(() => {
  setMyFiles(data)
 }, [])
 
 return (
  <>
   <div className="App">
    <Header />
    <div style={styles.container}>
     <div style={{ padding: 10, paddingBottom: 0, }}>
      <p style={{ fontWeight: "bold" }}>My Files</p>
      <p>{selectedFile ? selectedFile.path : filePath}</p>
     </div>
     <div style={styles.controlTools}>
            <button style={styles.controlButton}
              onClick={() => {
                if (selectedFile) {
                  const newFiles = myFiles.map(file => {
                    if (file.id === selectedFile.id) {
                      return {
                        ...file,
                        name: prompt("Enter new name")
                      }
                    }
                    return file
                  })
                  setMyFiles(newFiles)
                  setSelectedFile(null)
                }
              }}
            >Rename</button>
            <button style={styles.controlButton}
              onClick={() => {
                setShowChartModal(true)
              }}
            >Files Breakdown</button>
            <button style={styles.controlButton}
              onClick={() => {
                if (selectedFile){
                  window.open(selectedFile.path, "_blank")
                }
              }}
            >Download</button>
          </div>
     <div style={styles.fileContainer}>
      <div style={{ width: "100%", padding: 10 }}>
       {myFiles.map((file) => {
 
        if (file.path.slice(0, filePath.length) === filePath) {
         return (
          <div style={styles.file} className="files" key={file.id} onClick={() => {
           if (selectedFile && selectedFile.id === file.id) {
            setSelectedFile(null)
            return
           }
           setSelectedFile(file)
          }}>
           <p>{file.name}</p>
          </div>
         )
        }
       })}
      </div>
      {selectedFile && (
       <div style={styles.fileViewer}>
        {selectedFile.type === 'video' && (
         <VideoPlayer path={selectedFile.path} />
        )}
        {selectedFile.type === 'audio' && (
         <AudioPlayer path={selectedFile.path} />
        )}
        {selectedFile.type === 'document' && (
         <DocumentViewer path={selectedFile.path} />
        )}
        {selectedFile.type === 'image' && (
         <ImageViewer path={selectedFile.path} />
        )}
        <p style={{ fontWeight: "bold", marginTop: 10 }}>{selectedFile.name}</p>
        <p>path: <span style={{ fontStyle: "italic" }}>{selectedFile.path}</span></p>
        <p>file type: <span style={{fontStyle: "italic"}}>{selectedFile.type}</span></p>
       </div>
 
      )}
     </div>
    </div>
   </div>
  </>
 );
}
 
const styles = {
 container: {
  backgroundColor: '#fff',
  color: '#000',
 },
 fileContainer: {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  flexDirection: 'row',
 
 },
 file: {
  backgroundColor: '#eee',
  padding: '10px',
  marginBottom: '10px',
  cursor: 'pointer',
  width: '100%',
 },
 fileViewer: {
  padding: '10px',
  margin: '10px',
  width: '30vw',
  height: '100vh',
  cursor: 'pointer',
  borderLeft: '1px solid #000'
 },
 controlTools: {
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  flexDirection: 'row',
  padding: '10px',
 },
 controlButton: {
  padding: '10px',
  border: 'none',
  cursor: 'pointer',
  fontWeight: 'bold',
 },
};