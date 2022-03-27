package chromedp

import "github.com/chromedp/cdproto/cdp"

func NodeValues(nodes []*cdp.Node) []string {
	var values []string
	for _, node := range nodes {
		values = append(values, node.NodeValue)
	}
	return values
}
