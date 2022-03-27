package main

import (
	"context"
	"fmt"
	"github.com/chromedp/cdproto/cdp"
	"github.com/chromedp/cdproto/emulation"
	"github.com/chromedp/chromedp"
	"log"
	"time"
)

func elementScreenshot(urlstr, sel string, res *[]byte) chromedp.Tasks {
	return chromedp.Tasks{
		chromedp.Navigate(urlstr),
		chromedp.Screenshot(sel, res, chromedp.NodeVisible),
	}
}

func fullScreenshot(urlstr string, quality int, res *[]byte) chromedp.Tasks {
	return chromedp.Tasks{
		chromedp.Navigate(urlstr),
		chromedp.FullScreenshot(res, quality),
	}
}

var URL = `https://www.ur-net.go.jp/chintai/kanto/tokyo/result/?area=01&skcs=102&skcs=104&area=02&skcs=107&skcs=108&skcs=121&skcs=122&skcs=123&area=03&skcs=109&skcs=111&skcs=112&area=04&skcs=120&skcs=115&area=05&skcs=117&skcs=119&skcs=209&skcs=229&skcs=214&skcs=221&skcs=222&area=01&skcs=102&skcs=104&area=02&skcs=107&skcs=108&skcs=121&skcs=122&skcs=123&area=03&skcs=109&skcs=111&skcs=112&area=04&skcs=120&skcs=115&area=05&skcs=117&skcs=119&skcs=209&skcs=229&skcs=214&skcs=221&skcs=222&rent_low=&rent_high=&rent_low=&rent_high=&walk=15&bus=1&walk=15&bus=1&room=3DK&room=3LDK&room=3DK&room=3LDK&floorspace_low=&floorspace_high=&floorspace_low=&floorspace_high=&years=&years=&floor=2&floor=2&facility_internet=2&facility_internet=2&facility_internet=2&tdfk=13&todofuken=tokyo`

func main() {
	ctx, cancel := chromedp.NewContext(context.Background(), chromedp.WithLogf(log.Printf))
	defer cancel()
	var res string
	var nodes []*cdp.Node
	ctx, cancel = context.WithTimeout(ctx, 15*time.Second)
	start := time.Now()
	propertySel := `.module_searchs_property`
	propertyNameSel := fmt.Sprintf("%s %s", propertySel, `.rep_bukken-name`)
	detailURLSel := fmt.Sprintf("%s %s", propertySel, `.rep_bukken-link`)
	shikikinSel := fmt.Sprintf("%s %s", propertySel, `.rep_bukken-count-shikikin`)
	reikinSel := fmt.Sprintf("%s %s", propertySel, `.rep_bukken-count-reikin`)
	var propertyNameNodes, detailURLNodes, shikikinNodes, reikinNodes []*cdp.Node
	if err := chromedp.Run(ctx,
		emulation.SetUserAgentOverride("WebScraper 1.0"),
		chromedp.Navigate(URL),
		chromedp.Nodes(`.module_searchs_property`, &nodes, chromedp.ByQueryAll),
		chromedp.Nodes(propertyNameSel, &propertyNameNodes, chromedp.ByQueryAll),
		chromedp.Nodes(detailURLSel, &detailURLNodes, chromedp.ByQueryAll),
		chromedp.Nodes(shikikinSel, &shikikinNodes, chromedp.ByQueryAll),
		chromedp.Nodes(reikinSel, &reikinNodes, chromedp.ByQueryAll),
	); err != nil {
		log.Fatal(err)
	}
	fmt.Printf("text: %s", res)
	fmt.Printf("time: %f secs", time.Since(start).Seconds())
}

type PropertyTaskResult struct {
	DetailURL, PropertyName, Shikikin, Reikin string
}

func NewPropertyTaskResult() PropertyTaskResult {
	return PropertyTaskResult{}
}

//
//func propertyFetchingTasks() (PropertyTaskResult, error) {
//	propertyTaskResult := NewPropertyTaskResult()
//	propertyListSel := `.module_searchs_property`
//	propertyNameSel := fmt.Sprintf("%s %s", propertyListSel, `.rep_bukken-name`)
//	detailURLSel := fmt.Sprintf("%s %s", propertyListSel, `.rep_bukken-link`)
//	shikikinSel := fmt.Sprintf("%s %s", propertyListSel, `.rep_bukken-count-shikikin`)
//	reikinSel := fmt.Sprintf("%s %s", propertyListSel, `.rep_bukken-count-reikin`)
//	if err := chromedp.Run()
//	return chromedp.Tasks{
//		chromedp.Navigate(URL),
//		chromedp.WaitVisible(propertyListSel),
//		chromedp.AttributeValue(detailURLSel, "href", &(propertyTaskResult.DetailURL)),
//	}
//}
