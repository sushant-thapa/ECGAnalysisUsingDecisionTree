import React , {Component} from 'react'

import {Segment} from "semantic-ui-react";

class HeartBeatMonitor extends Component {
    constructor(props){
        super(props)
        this.state={
            width:0,
            height:0,
            ctx:null,
            lines:[],
            beam:[],
            points:[],
            beaming: false,
            pointsSet:false,
            beamIndex:0,
            beamWidth:500,
            beamSpeed:4,
            beamStartX: -400,
            beamEndX:0,
        }

        this.updateBeam.bind(this)
    }

    componentDidMount() {
        const c = document.getElementById("canvas")
        const ctx = c.getContext("2d")

        const width = c.clientWidth
        const height = c.clientWidth

        c.width = width;
        c.height = height;

        const lines = this.getLines(this.props.beat.vals)

        this.setState({height,width,ctx,lines})

        this.interval = setInterval(() => this.updateBeam(),1/30)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
        console.log("Component unmounted")
    }

    componentDidUpdate(prevProps){
        if (prevProps.beat.key!=this.props.beat.key){
            console.log("Prop change")
            const {beamWidth} = this.state
            const lines = this.getLines(this.props.beat.vals)
            const beamIndex = 0,
                  beamStartX = -beamWidth,
                  beamEndX = 0
            this.setState({lines,beamIndex,beamStartX,beamEndX,pointsSet:false})
        }
        else {
            const {lines, beam, pointsSet} = this.state
            this.clearCanvas()
            this.fillColor()
            this.drawAxes()
            this.drawGrid()
            if (!pointsSet) {
                const points = this.getPoints(lines)
                this.setState({points, pointsSet: true})
            }
            this.drawPoints(beam)
        }
    }


    clearCanvas(){
        const {ctx,width,height} = this.state
        ctx.beginPath()
        ctx.clearRect(0,0,width,height)
    }

    updateBeam() {
        const {points,beamSpeed,beamWidth,beamIndex,beamStartX,beamEndX} = this.state

        const beam = []

        let newBeamStartX = beamStartX+beamSpeed,
            newBeamEndX = beamEndX+beamSpeed,
            newBeamIndex


        for (let i=beamIndex;i<points.length;i++){
            if (i === (points.length-1) ){
                newBeamIndex = 0
                newBeamStartX = -beamWidth
                newBeamEndX = 0
                break
            }
            if (points[i].x > newBeamStartX){
                newBeamIndex = i
                break
            }
        }


        for (let i=beamIndex;i<points.length;i++){
            if (points[i].x <= beamEndX){
                beam.push(points[i])
            }
            else{
                break
            }
        }

        this.setState({
            beam,
            beamIndex:newBeamIndex,
            beamStartX:newBeamStartX,
            beamEndX:newBeamEndX

        })

    }


    getPoints(lines){
        const points = []
        for (let i=0;i<lines.length;i++){
            const {start,end} = lines[i]
            const viewStart = this.transform(start),
                  viewEnd = this.transform(end)

            const dx = Math.abs(viewEnd.x - viewStart.x)
            const dy = Math.abs(viewEnd.y - viewStart.y)

            if (dx>dy) {
                points.push({
                    x: viewStart.x,
                    y: this.interpolateViewY(viewStart, viewEnd, viewStart.x)
                })

                const a = Math.min(viewEnd.x,viewStart.x),
                    b = Math.max(viewEnd.x,viewStart.x)

                for (let j = a + 1; j < b; j++) {
                    const x = j
                    const y = this.interpolateViewY(viewStart, viewEnd, x)
                    points.push({x, y})
                }
            }
            else{
                points.push({
                    x:this.interpolateViewX(viewStart,viewEnd,viewStart.y),
                    y:viewStart.y
                })

                if (viewEnd.y > viewStart.y){
                    for (let j=viewStart.y+1;j<viewEnd.y;j++){
                        const y = j
                        const x = this.interpolateViewX(viewStart, viewEnd, y)
                        points.push({x, y})
                    }
                }
                else{
                    for (let j=viewStart.y+1;j>viewEnd.y;j--){
                        const y = j
                        const x = this.interpolateViewX(viewStart, viewEnd, y)
                        points.push({x, y})
                    }
                }
            }
        }
        return points
    }

    interpolateViewY(start,end,x){
        return start.y + (end.y-start.y)/(end.x-start.x)*(x-start.x)
    }

    interpolateViewX(start,end,y){
        return start.x + (end.x-start.x)/(end.y-start.y)*(y-start.y)
    }

    drawPoints(points){
        const {ctx} = this.state
        for (let i=0;i<points.length;i++){
            const {x,y} = points[i]
            ctx.beginPath()
            ctx.fillStyle="green"
            ctx.arc(x,y,3,0,2*Math.PI,false)
            ctx.fill()
        }
    }

    getLines(vals){

        const maxY = Math.max(...vals)
        const minY = Math.min(...vals)

        const dY = maxY- minY

        const scale = 100/dY

        const valsScaled = vals.map(val => (val - minY) * scale - 50)

        const xRatio = 200/(valsScaled.length-1)

        let lines = []

        for (let i=0;i<vals.length-1;i++){
            const start = {x: Math.round(-100+i*xRatio) , y: valsScaled[i]}
            const end   = {x: Math.round(-100+(i+1)*xRatio) , y: valsScaled[i+1]}
            lines.push({start,end})
        }

        return lines

    }


    fillColor(){
        const {height,width,ctx} = this.state
        ctx.beginPath()
        ctx.shadowBlur=0
        ctx.fillStyle="black"
        ctx.fillRect(0,0,width,height)
    }

    drawBeat(){
        //const {lines} = this.state
        //this.drawLines(lines,"green",4,true)

    }

    drawLines(lines,color="green",lineWidth=1,glow=false){
        const {ctx,height,width} = this.state

        ctx.beginPath()
        const viewStart=this.transform(lines[0].start)
        ctx.moveTo(viewStart.x,viewStart.y)
        ctx.lineJoin="rounded"
        ctx.globalAlpha=1
        ctx.strokeStyle=color
        ctx.lineWidth=lineWidth
        if (glow) {
            ctx.globalCompositeOperation = "lighter"
            ctx.shadowBlur = 1
            ctx.shadowColor = color
        }


        for(let i=0;i<lines.length;i++){
            const {end} = lines[i]
            const viewEnd = this.transform(end)

            ctx.lineTo(viewEnd.x,viewEnd.y)
        }
    }

    transform(pt){
        const {width,height} = this.state
        const origin = {
            x: Math.round(width/2),
            y: Math.round(height/2)
        }
        const final = {
            x: Math.round(origin.x + pt.x/200*width) ,
            y: Math.round(origin.y - pt.y/200*height)
        }

        return final
    }

    drawAxes(){
        this.drawLine({x:-100,y:0},{x:100,y:0},"green",0.5,true)
        this.drawLine({x:0,y:100},{x:0,y:-100},"green",0.5,true)
    }

    drawGrid(){
        const drawGreenThinLine = (a,b) => this.drawLine(a,b,"green",0.5,true)
        for (let i=1;i<10;i++){
            drawGreenThinLine({x:0+i*10 ,y: -100},{x:0+i*10,y:100})
            drawGreenThinLine({x:0-i*10 ,y: -100},{x:0-i*10,y:100})
            drawGreenThinLine({x:-100   ,y: 0+i*10},{x:100,y:0+i*10})
            drawGreenThinLine({x:-100   ,y: 0-i*10},{x:100,y:0-i*10})
        }
    }

    drawLine(a,b,color="green",lineWidth=1,glow=false){
        const {height,width,ctx} = this.state

        const origin = {
            x: Math.round(width/2),
            y: Math.round(height/2)
        }

        const start = {
            x: Math.round(a.x/200 * width),
            y: Math.round(-a.y/200 * height)
        }

        const end = {
            x: Math.round(b.x/200 * width),
            y: Math.round(-b.y/200 * height)
        }

        ctx.beginPath()
        if (glow) {
            ctx.globalCompositeOperation = "lighter"
            ctx.shadowBlur = 1
            ctx.shadowColor = color
        }
        ctx.globalAlpha=1
        ctx.strokeStyle=color
        ctx.lineWidth=lineWidth
        ctx.moveTo(origin.x + start.x, origin.y + start.y )
        ctx.lineTo(origin.x + end.x, origin.y + end.y)
        ctx.stroke()
    }

    render(){
        return (
            <Segment textAlign="center" vertical style={{paddingTop:0}}>
                <canvas id="canvas" style={{
                    border: "black 1px solid",
                    width: "99%",
                    maxWidth: 1000,
                    height: 700
                }}/>
            </Segment>
        )
    }
}


export default HeartBeatMonitor