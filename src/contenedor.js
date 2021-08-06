const fs=require('fs')
class Contenedor{
	static id=0
	constructor(archivo){
		this.archivo=archivo
		try{
			this.fileInfo = fs.readFileSync(this.archivo,'utf-8')
			this.fileInfo=JSON.parse(this.fileInfo)
			Contenedor.id = this.fileInfo[this.fileInfo.length-1].id
			console.log(`all documents loaded, id starts from ${Contenedor.id}`)
		}catch (error){
			console.log('no file available or empty, starting id from 0')
		}
	}
	async save(element){
		try{
			Contenedor.id+=1
			element.id=Contenedor.id
			if(!this.fileInfo){
				this.fileInfo=[]
			}
			this.fileInfo.push(element)
			await fs.promises.writeFile(this.archivo,JSON.stringify(this.fileInfo,null,2))
			console.log('guardado')
		} catch(err){
			Contenedor.id-=1
			console.log(err)
		}
	}
	getById(id){
		const document = this.fileInfo.filter((doc)=>{
			return doc.id === id
		})
		return document
	}
	getAll(){
		if(this.fileInfo){
			return this.fileInfo
		}else {
			return []
		}
	}
	async deleteById(id){
		try{
			this.fileInfo = this.fileInfo.filter((doc)=>{
				return doc.id != id
			})
			await fs.promises.writeFile(this.archivo,JSON.stringify(this.fileInfo,null,2))
		} catch(err) {
			console.log(err)
		}
	}
	async deleteAll(){
		try{
			this.fileInfo=[]
			await fs.promises.writeFile(this.archivo,JSON.stringify(this.fileInfo,null,2))
		} catch(err) {
			console.log(err)
		}
	}

}
module.exports= Contenedor